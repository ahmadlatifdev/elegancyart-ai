"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Provider = "gpt" | "deepseek";
type StatusType = "LIVE" | "ERROR" | "IDLE";

type ProjectOption = {
  id: string;
  name: string;
};

type SessionItem = {
  id: string;
  title: string;
  provider: string;
  updated_at: string;
  created_at: string;
};

type ChatMessage = {
  id?: number;
  role: "user" | "assistant" | "system";
  content: string;
  provider?: string | null;
  has_image?: boolean;
  created_at?: string;
};

const PROJECTS: ProjectOption[] = [
  { id: "bossmind-core", name: "BossMind Core" },
  { id: "resumora", name: "Resumora" },
  { id: "elegancyart", name: "ElegancyArt" },
  { id: "ai-video-generator", name: "AI Video Generator" },
  { id: "marketing-system", name: "Marketing System" },
];

function createSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function formatTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

async function fileToBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function BossMindLuxuryChat() {
  const [isReady, setIsReady] = useState(false);

  const [projectId, setProjectId] = useState<string>("resumora");
  const [provider, setProvider] = useState<Provider>("gpt");
  const [sessionId, setSessionId] = useState<string>("");

  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const [status, setStatus] = useState<{ gpt: StatusType; deepseek: StatusType }>({
    gpt: "IDLE",
    deepseek: "IDLE",
  });

  const [lastError, setLastError] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);

  const currentProjectName = useMemo(() => {
    return PROJECTS.find((p) => p.id === projectId)?.name || projectId;
  }, [projectId]);

  useEffect(() => {
    setSessionId(createSessionId());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    void loadSessions(projectId);
  }, [isReady, projectId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function loadSessions(targetProjectId: string) {
    try {
      const res = await fetch(
        `/api/chat/sessions?projectId=${encodeURIComponent(targetProjectId)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data?.ok) {
        setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      } else {
        setSessions([]);
      }
    } catch {
      setSessions([]);
    }
  }

  async function loadMessages(targetSessionId: string) {
    try {
      const res = await fetch(
        `/api/chat/messages?sessionId=${encodeURIComponent(targetSessionId)}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data?.ok) {
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    }
  }

  function resetComposer() {
    setInput("");
    setImageBase64(null);
    setImageFileName("");
    setLastError("");
  }

  function createNewChat() {
    setSessionId(createSessionId());
    setMessages([]);
    resetComposer();
    setStatus({
      gpt: "IDLE",
      deepseek: "IDLE",
    });
  }

  async function onSelectSession(item: SessionItem) {
    setSessionId(item.id);
    setProvider((item.provider as Provider) || "gpt");
    setLastError("");
    await loadMessages(item.id);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setImageBase64(base64);
    setImageFileName(file.name);
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || sending || !sessionId) return;

    const localUserMessage: ChatMessage = {
      role: "user",
      content: trimmed,
      provider,
      has_image: !!imageBase64,
      created_at: new Date().toISOString(),
    };

    const history = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setSending(true);
    setLastError("");
    setMessages((prev) => [...prev, localUserMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          sessionId,
          provider,
          message: trimmed,
          messages: history,
          screenshotBase64: imageBase64,
        }),
      });

      const data = await res.json();

      if (!data?.ok) {
        const errorText = data?.error || "No response";
        setLastError(errorText);
        setStatus((prev) => ({
          ...prev,
          [provider]: "ERROR",
        }));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorText,
            provider,
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setStatus((prev) => ({
          ...prev,
          [provider]: "LIVE",
        }));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            provider,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      setImageBase64(null);
      setImageFileName("");
      await loadSessions(projectId);
    } catch (error: any) {
      const errorText = error?.message || "No response";
      setLastError(errorText);
      setStatus((prev) => ({
        ...prev,
        [provider]: "ERROR",
      }));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorText,
          provider,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function copyText(text: string) {
    void navigator.clipboard.writeText(text);
  }

  function statusClass(value: StatusType) {
    if (value === "LIVE") {
      return "border-emerald-400/30 bg-emerald-500/15 text-emerald-300";
    }
    if (value === "ERROR") {
      return "border-red-400/30 bg-red-500/15 text-red-300";
    }
    return "border-zinc-400/20 bg-zinc-500/10 text-zinc-300";
  }

  if (!isReady) {
    return (
      <div className="min-h-[calc(100vh-140px)] rounded-[28px] border border-white/10 bg-[#050b16]" />
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-140px)] overflow-hidden rounded-[28px] border border-[#d4a94d]/20 bg-[#050b16] text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,169,77,0.14),transparent_25%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#06101d_0%,#030814_100%)]" />

      <div className="relative grid min-h-[calc(100vh-140px)] grid-cols-12">
        <aside className="col-span-12 border-b border-white/10 bg-black/20 backdrop-blur md:col-span-3 md:border-b-0 md:border-r">
          <div className="p-5">
            <div className="mb-5 rounded-[24px] border border-[#d4a94d]/25 bg-[linear-gradient(135deg,rgba(212,169,77,0.12),rgba(255,255,255,0.02))] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
              <div className="text-[11px] uppercase tracking-[0.35em] text-[#d4a94d]">
                BossMind Admin
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                Luxury Chat
              </div>
              <div className="mt-2 text-sm leading-6 text-zinc-300">
                Real multi-provider workspace with sessions, project switch, vision upload, and live AI status.
              </div>
            </div>

            <button
              type="button"
              onClick={createNewChat}
              className="mb-5 w-full rounded-[18px] border border-[#d4a94d]/30 bg-[linear-gradient(90deg,rgba(212,169,77,0.18),rgba(212,169,77,0.06))] px-4 py-3 text-sm font-medium text-[#f3d58b] transition hover:border-[#d4a94d]/45 hover:bg-[linear-gradient(90deg,rgba(212,169,77,0.28),rgba(212,169,77,0.08))] active:scale-[0.99]"
            >
              + New Chat Session
            </button>

            <div className="mb-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                Project Switch
              </div>
              <select
                value={projectId}
                onChange={(e) => {
                  setProjectId(e.target.value);
                  createNewChat();
                }}
                className="block w-full rounded-[16px] border border-white/10 bg-[#081321] px-3 py-3 text-sm text-white outline-none"
              >
                {PROJECTS.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                AI Provider
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProvider("gpt")}
                  className={`rounded-[16px] border px-4 py-3 text-sm transition active:scale-[0.99] ${
                    provider === "gpt"
                      ? "border-[#d4a94d]/40 bg-[#d4a94d]/15 text-[#f2d48d]"
                      : "border-white/10 bg-[#081321] text-zinc-300 hover:bg-[#0b1727]"
                  }`}
                >
                  GPT
                </button>

                <button
                  type="button"
                  onClick={() => setProvider("deepseek")}
                  className={`rounded-[16px] border px-4 py-3 text-sm transition active:scale-[0.99] ${
                    provider === "deepseek"
                      ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                      : "border-white/10 bg-[#081321] text-zinc-300 hover:bg-[#0b1727]"
                  }`}
                >
                  DeepSeek
                </button>
              </div>
            </div>

            <div className="mb-5 rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                AI Status
              </div>

              <div className="space-y-3">
                <div className={`flex items-center justify-between rounded-[14px] border px-3 py-2 text-sm ${statusClass(status.gpt)}`}>
                  <span>GPT</span>
                  <span>{status.gpt}</span>
                </div>
                <div className={`flex items-center justify-between rounded-[14px] border px-3 py-2 text-sm ${statusClass(status.deepseek)}`}>
                  <span>DeepSeek</span>
                  <span>{status.deepseek}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                Chat Sessions
              </div>

              <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
                {sessions.length === 0 ? (
                  <div className="rounded-[14px] border border-dashed border-white/10 bg-[#081321] px-3 py-4 text-sm text-zinc-400">
                    No sessions yet
                  </div>
                ) : (
                  sessions.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => onSelectSession(item)}
                      className={`w-full rounded-[16px] border px-3 py-3 text-left transition active:scale-[0.99] ${
                        sessionId === item.id
                          ? "border-[#d4a94d]/40 bg-[#d4a94d]/10"
                          : "border-white/10 bg-[#081321] hover:bg-[#0b1727]"
                      }`}
                    >
                      <div className="truncate text-sm font-medium text-white">
                        {item.title}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-400">
                        <span>{item.provider}</span>
                        <span>{formatTime(item.updated_at)}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="col-span-12 flex min-h-[calc(100vh-140px)] flex-col md:col-span-9">
          <div className="border-b border-white/10 bg-black/15 px-6 py-5 backdrop-blur">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                  Active Workspace
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {currentProjectName}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  Session: <span className="text-white">{sessionId}</span>
                </div>
                <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                  Provider: <span className="text-white uppercase">{provider}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-6 py-6">
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
              {messages.length === 0 ? (
                <div className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
                  <div className="text-2xl font-semibold text-white">
                    BossMind Luxury Admin Chat
                  </div>
                  <div className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                    Real GPT and DeepSeek switching, screenshot analysis with GPT vision, chat sessions, project switching, and live status indicators.
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                        Provider
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {provider.toUpperCase()}
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                        Status
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {provider === "gpt" ? status.gpt : status.deepseek}
                      </div>
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-black/20 p-4">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                        Project
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">
                        {currentProjectName}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-5 flex-1 overflow-y-auto rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => {
                      const isUser = msg.role === "user";

                      return (
                        <div
                          key={`${msg.created_at || idx}-${idx}`}
                          className={`rounded-[24px] border p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] ${
                            isUser
                              ? "ml-auto max-w-3xl border-[#d4a94d]/20 bg-[linear-gradient(135deg,rgba(212,169,77,0.12),rgba(212,169,77,0.04))]"
                              : "mr-auto max-w-4xl border-white/10 bg-white/5"
                          }`}
                        >
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                              {msg.role}
                            </div>

                            <div className="flex items-center gap-2">
                              {msg.provider && (
                                <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase text-zinc-300">
                                  {msg.provider}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => copyText(msg.content)}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] uppercase text-zinc-300 transition hover:bg-black/30"
                              >
                                Copy
                              </button>
                            </div>
                          </div>

                          <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-100">
                            {msg.content}
                          </div>

                          {msg.created_at && (
                            <div className="mt-4 text-[11px] text-zinc-500">
                              {formatTime(msg.created_at)}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {sending && (
                      <div className="mr-auto max-w-4xl rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
                        <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                          assistant
                        </div>
                        <div className="mt-3 text-sm text-zinc-300">Processing...</div>
                      </div>
                    )}

                    <div ref={endRef} />
                  </div>
                </div>
              )}

              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.24)]">
                {lastError && (
                  <div className="mb-4 rounded-[18px] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {lastError}
                  </div>
                )}

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/10">
                    Upload Screenshot
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {imageFileName && (
                    <div className="rounded-[16px] border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                      Vision file: {imageFileName}
                    </div>
                  )}

                  {provider === "deepseek" && imageFileName && (
                    <div className="rounded-[16px] border border-[#d4a94d]/20 bg-[#d4a94d]/10 px-4 py-3 text-sm text-[#f2d48d]">
                      Screenshot analysis uses GPT vision in this version.
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 xl:flex-row">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Continue BossMind project work here..."
                    rows={5}
                    className="min-h-[140px] flex-1 resize-none rounded-[20px] border border-white/10 bg-[#081321] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-500"
                  />

                  <div className="flex w-full flex-col gap-3 xl:w-[220px]">
                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={sending || !input.trim()}
                      className="rounded-[18px] border border-[#d4a94d]/30 bg-[linear-gradient(90deg,rgba(212,169,77,0.18),rgba(212,169,77,0.06))] px-5 py-4 text-sm font-medium text-[#f3d58b] transition hover:border-[#d4a94d]/45 hover:bg-[linear-gradient(90deg,rgba(212,169,77,0.28),rgba(212,169,77,0.08))] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>

                    <button
                      type="button"
                      onClick={resetComposer}
                      className="rounded-[18px] border border-white/10 bg-[#081321] px-5 py-4 text-sm text-zinc-300 transition hover:bg-[#0b1727] active:scale-[0.99]"
                    >
                      Clear Draft
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(messages.map((m) => `${m.role}: ${m.content}`).join("\n\n"))
                      }
                      className="rounded-[18px] border border-white/10 bg-[#081321] px-5 py-4 text-sm text-zinc-300 transition hover:bg-[#0b1727] active:scale-[0.99]"
                    >
                      Copy Full Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}