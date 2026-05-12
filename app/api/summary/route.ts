import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      tool,
      plan,
      monthlySpend,
      teamSize,
      recommendation,
      savings,
    } = body;

    const prompt = `
You are an AI financial assistant.

Generate a short professional summary for a startup's AI spending audit.

Tool: ${tool}
Current Plan: ${plan}
Monthly Spend: $${monthlySpend}
Team Size: ${teamSize}

Recommendation: ${recommendation}
Potential Savings: $${savings}/month

Keep response under 100 words.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const summary =
      response.choices[0].message.content;

    return Response.json({
      summary,
    });

  } catch (error) {

    return Response.json({
      summary:
        "Your AI stack contains optimization opportunities that could reduce operational spending while maintaining team productivity.",
    });
  }
}