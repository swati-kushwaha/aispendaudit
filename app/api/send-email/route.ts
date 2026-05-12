import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      email,
      recommendation,
      savings,
      summary,
      reportLink,
    } = body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",

      to: email,

      subject: "Your AI Spend Audit Report",

      html: `
        <h2>AI Spend Audit Report</h2>

        <p>
          <strong>Recommendation:</strong>
          ${recommendation}
        </p>

        <p>
          <strong>Estimated Savings:</strong>
          $${savings}/month
        </p>

        <p>
          ${summary}
        </p>

        <a href="${reportLink}">
          View Full Report
        </a>
      `,
    });

    return Response.json(data);

  } catch (error) {

    return Response.json(
      {
        error: "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}