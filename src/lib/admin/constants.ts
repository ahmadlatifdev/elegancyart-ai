export const BOSS_PROJECTS = [
  {
    projectKey: "ai-video-generator",
    name: "AI Video Generator",
    route: "/admin/projects/ai-video-generator",
  },
  {
    projectKey: "elegancyart-ai-builder",
    name: "ElegancyArt AI Builder",
    route: "/admin/projects/elegancyart-ai-builder",
  },
  {
    projectKey: "resumora",
    name: "Resumora",
    route: "/admin/projects/resumora",
  },
  {
    projectKey: "tiktok-ai",
    name: "TikTok AI",
    route: "/admin/projects/tiktok-ai",
  },
  {
    projectKey: "global-stock",
    name: "Global Stock",
    route: "/admin/projects/global-stock",
  },
] as const;

export const PROJECT_KEY_SET = new Set(
  BOSS_PROJECTS.map((p) => p.projectKey)
);

export const COMMANDS = [
  "start",
  "stop",
  "pause",
  "resume",
  "retry_failures",
  "refresh_sync",
  "refresh_analytics",
] as const;

export type BossProjectKey =
  (typeof BOSS_PROJECTS)[number]["projectKey"];

export type AdminCommand =
  (typeof COMMANDS)[number];