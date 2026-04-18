"use client";

import { useMemo, useRef, useState, useEffect } from "react";

type Lang = "en" | "fr";
type Role = "assistant" | "user";

type Message = {
  id: string;
  role: Role;
  content: string;
};

const text = {
  en: {
    title: "Resumora Live Chat",
    subtitle: "Professional support for resume and career services.",
    welcome: "Welcome to Resumora Support. How can we help you today?",
    placeholder: "Type your message...",
    send: "Send",
    autoReply: "Thanks for your message. Our team will assist you shortly.",
    typing: "Resumora is typing...",
    emptyState: "Start your conversation with Resumora support.",
  },
  fr: {
    title: "Chat En Direct Resumora",
    subtitle: "Support professionnel pour les CV et services de carrière.",
    welcome: "Bienvenue au support Resumora. Comment pouvons-nous vous aider aujourd’hui ?",
    placeholder: "Tapez votre message...",
    send: "Envoyer",
    autoReply: "Merci pour votre message. Notre équipe vous assistera sous peu.",
    typing: "Resumora est en train d’écrire...",
    emptyState: "Commencez votre conversation avec le support Resumora.",
  },
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ResumoraChatPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => text[lang], [lang]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: "assistant",
      content: text.en.welcome,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const switchLanguage = (nextLang: Lang) => {
    setLang(nextLang);

    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [
          {
            id: createId(),
            role: "assistant",
            content: text[nextLang].welcome,
          },
        ];
      }
      return prev;
    });
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: createId(),
        role: "assistant",
        content: text[lang].autoReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#0b1d36] p-3 md:p-6">
      <section className="mx-auto flex min-h-[calc(100vh-24px)] w-full max-w-6xl flex-col rounded-3xl border border-white/10 bg-[#10284a] shadow-2xl md:min-h-[calc(100vh-48px)]">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 md:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-white md:text-2xl">
              {t.title}
            </h1>
            <p className="mt-1 text-xs text-blue-100/80 md:text-sm">
              {t.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                lang === "en"
                  ? "bg-yellow-500 text-black"
                  : "bg-slate-600 text-white hover:bg-slate-500"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => switchLanguage("fr")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                lang === "fr"
                  ? "bg-yellow-500 text-black"
                  : "bg-slate-600 text-white hover:bg-slate-500"
              }`}
            >
              FR
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden px-3 py-3 md:px-6 md:py-5">
          <div className="flex h-full flex-col rounded-2xl bg-[#0f2442]">
            <div className="flex-1 overflow-y-auto px-3 py-4 md:px-5">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center text-sm text-blue-100/70 md:text-base">
                  {t.emptyState}
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 md:max-w-[70%] md:text-base ${
                          message.role === "user"
                            ? "bg-yellow-500 text-black"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-blue-700 px-4 py-3 text-sm text-white md:text-base">
                        {t.typing}
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3 md:p-4">
              <div className="flex items-stretch gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={t.placeholder}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-yellow-500 md:text-base"
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={isTyping}
                  className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {t.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}