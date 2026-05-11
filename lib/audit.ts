interface AuditResult {
  recommendation: string;
  savings: number;
  annualSavings: number;
  reason: string;
  summary: string;
}

export function generateAudit(
  tool: string,
  plan: string,
  monthlySpend: number,
  teamSize: number
): AuditResult {

  // ChatGPT Enterprise downgrade
  if (
    tool === "chatgpt" &&
    plan.toLowerCase() === "enterprise" &&
    teamSize <= 5
  ) {

    const savings = 200;

    return {
      recommendation: "Switch to ChatGPT Team Plan",
      savings,
      annualSavings: savings * 12,
      reason:
        "Enterprise pricing is often unnecessary for teams smaller than 5 users.",
      summary:
        "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
    };
  }

  // Cursor optimization
  if (
    tool === "cursor" &&
    monthlySpend > 100
  ) {

    const savings = 50;

    return {
      recommendation: "Downgrade to Cursor Pro",
      savings,
      annualSavings: savings * 12,
      reason:
        "Your Cursor spend appears high relative to your current team size.",
      summary:
        "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
    };
  }

  // Claude optimization
  if (
    tool === "claude" &&
    monthlySpend > 150
  ) {

    const savings = 70;

    return {
      recommendation: "Move to Claude Team Plan",
      savings,
      annualSavings: savings * 12,
      reason:
        "Your current Claude usage may be overprovisioned for typical workloads.",
      summary:
        "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
    };
  }

  // Copilot optimization
  if (
    tool === "copilot" &&
    teamSize <= 2 &&
    plan.toLowerCase() === "business"
  ) {

    const savings = 25;

    return {
      recommendation: "Switch to Copilot Individual",
      savings,
      annualSavings: savings * 12,
      reason:
        "Copilot Business features are often unnecessary for very small teams.",
      summary:
        "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
    };
  }

  // Gemini optimization
  if (
    tool === "gemini" &&
    monthlySpend > 80
  ) {

    const savings = 30;

    return {
      recommendation: "Downgrade Gemini Plan",
      savings,
      annualSavings: savings * 12,
      reason:
        "Your Gemini costs appear higher than standard usage benchmarks.",
      summary:
        "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
    };
  }

  // Default response
  return {
    recommendation: "Your current setup looks optimized",
    savings: 0,
    annualSavings: 0,
    reason:
      "We could not identify major savings opportunities in your current stack.",
    summary:
      "Your AI stack contains opportunities to reduce unnecessary spending while maintaining productivity and team collaboration.",
  };
}