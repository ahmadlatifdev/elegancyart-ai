"use client";

type ProjectChatItem = {
  key: string;
  label: string;
  description: string;
  status: string;
  gptUrl: string;
  deepseekUrl: string;
};

const projectChats: ProjectChatItem[] = [
  {
    key: "resumora",
    label: "Resumora",
    description: "ATS resume generation, cover letters, hiring workflow memory.",
    status: "Shared Memory Ready",
    gptUrl: "/chat/resumora/gpt",
    deepseekUrl: "/chat/resumora/deepseek",
  },
  {
    key: "elegancyart",
    label: "ElegancyArt",
    description: "Luxury storefront, admin controls, layout workflow, automation.",
    status: "Shared Memory Ready",
    gptUrl: "/chat/elegancyart/gpt",
    deepseekUrl: "/chat/elegancyart/deepseek",
  },
  {
    key: "bossmind",
    label: "BossMind",
    description: "Central orchestration, multi-project control, locked memory core.",
    status: "Shared Memory Ready",
    gptUrl: "/chat/bossmind/gpt",
    deepseekUrl: "/chat/bossmind/deepseek",
  },
  {
    key: "ai-video-generator",
    label: "AI Video Generator",
    description: "Script flow, scene pipeline, generation queue, publishing logic.",
    status: "Shared Memory Ready",
    gptUrl: "/chat/ai-video-generator/gpt",
    deepseekUrl: "/chat/ai-video-generator/deepseek",
  },
  {
    key: "ai-trading",
    label: "AI Trading",
    description: "Trading signals, monitoring, execution workflow, strategy memory.",
    status: "Shared Memory Ready",
    gptUrl: "/chat/ai-trading/gpt",
    deepseekUrl: "/chat/ai-trading/deepseek",
  },
];

export default function ProjectChatButtons() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.35)] md:p-7">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/90">
            Project Chat Control
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Advanced Admin Chat Access
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Launch GPT or DeepSeek workspace pages for every BossMind project
            from one admin section.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          5 Projects Connected
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {projectChats.map((project) => (
          <div
            key={project.key}
            className="group rounded-3xl border border-white/10 bg-slate-950/60 p-5 transition duration-200 hover:border-cyan-400/30 hover:bg-slate-900/80"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {project.label}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {project.status}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={project.gptUrl}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:brightness-105"
                >
                  Open GPT Chat
                </a>

                <a
                  href={project.deepseekUrl}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                >
                  Open DeepSeek Chat
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}