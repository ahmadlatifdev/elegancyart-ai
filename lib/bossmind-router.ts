type EngineName = "deepseek" | "gpt";

export function chooseEngine(preferred?: string): EngineName {
  const engine = (preferred || "").toLowerCase().trim();

  if (engine === "gpt") {
    return "gpt";
  }

  return "deepseek";
}

export function getModelForEngine(engine: EngineName): string {
  if (engine === "gpt") {
    return process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  return process.env.DEEPSEEK_MODEL || "deepseek-chat";
}

export function getApiUrlForEngine(engine: EngineName): string {
  if (engine === "gpt") {
    return "https://api.openai.com/v1/chat/completions";
  }

  return "https://api.deepseek.com/v1/chat/completions";
}

export function getHeadersForEngine(engine: EngineName): Record<string, string> {
  if (engine === "gpt") {
    return {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
      "Content-Type": "application/json",
    };
  }

  return {
    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY || ""}`,
    "Content-Type": "application/json",
  };
}