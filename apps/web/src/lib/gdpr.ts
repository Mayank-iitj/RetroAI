export function buildConsentDefaults() {
  return {
    analytics: false,
    personalization: false,
    essential: true
  };
}

export function redactPII(input: string): string {
  return input.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]");
}
