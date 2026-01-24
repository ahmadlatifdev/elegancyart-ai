export function validateEmail(email: string): boolean {
  if (!email) return false;
  // Simple, stable validation (good enough for auth UI gating)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
