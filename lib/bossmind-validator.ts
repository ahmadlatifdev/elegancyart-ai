export function validateResponse(memory: any, response: string) {
  if (!memory) {
    throw new Error("Memory not loaded");
  }

  if (!response || response.trim() === "") {
    throw new Error("Empty response blocked");
  }

  if (
    response.includes("I think") ||
    response.includes("maybe") ||
    response.includes("might") ||
    response.includes("possibly")
  ) {
    throw new Error("Hallucination detected");
  }

  if (!response.includes("source") && !response.includes("data")) {
    throw new Error("No source detected → blocked");
  }

  return true;
}