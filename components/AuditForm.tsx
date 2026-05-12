"use client";

import { generateAudit } from "@/lib/audit";
import SavingsChart from "@/components/SavingsChart";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("audit-form");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setTool(parsedData.tool || "");
      setPlan(parsedData.plan || "");
      setMonthlySpend(parsedData.monthlySpend || "");
      setTeamSize(parsedData.teamSize || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify({
        tool,
        plan,
        monthlySpend,
        teamSize,
      })
    );
  }, [tool, plan, monthlySpend, teamSize]);

  const handleGenerateAudit = async () => {

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    const audit = generateAudit(
      tool,
      plan,
      Number(monthlySpend),
      Number(teamSize)
    );

    try {

      const response = await fetch("/api/summary", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tool,
          plan,
          monthlySpend,
          teamSize,
          recommendation: audit.recommendation,
          savings: audit.savings,
        }),
      });

      const data = await response.json();

      audit.summary = data.summary;

    } catch (error) {

      audit.summary =
        "Unable to generate AI summary at the moment.";
    }

    const { data } = await supabase
      .from("audit_reports")
      .insert([
        {
          tool,
          plan,
          monthly_spend: Number(monthlySpend),
          team_size: Number(teamSize),
          recommendation: audit.recommendation,
          savings: audit.savings,
          annual_savings: audit.annualSavings,
          summary: audit.summary,
        },
      ])
      .select();

    if (data && data.length > 0) {
      setReportId(data[0].id);
    }

    setResult(audit);

    setLoading(false);
  };

  return (
    <section className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
      <h2 className="text-3xl font-bold mb-6">
        Audit Your AI Stack
      </h2>

      <div className="grid gap-6">

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            AI Tool
          </label>

          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          >
            <option value="">Select Tool</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="claude">Claude</option>
            <option value="cursor">Cursor</option>
            <option value="copilot">GitHub Copilot</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Current Plan
          </label>

          <input
            type="text"
            placeholder="Example: Team"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Monthly Spend ($)
          </label>

          <input
            type="number"
            placeholder="200"
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Team Size
          </label>

          <input
            type="number"
            placeholder="5"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          />
        </div>

        <button
          onClick={handleGenerateAudit}
          disabled={loading}
          className="bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Generating Audit..." : "Generate Audit"}
        </button>

        {result && (
          <div className="mt-10 rounded-3xl bg-black border border-zinc-700 p-8">

            <div className="mb-8">
              <p className="text-sm uppercase tracking-widest text-green-400 mb-2">
                Estimated Savings
              </p>

              <h3 className="text-5xl font-bold">
                ${result.annualSavings}
                <span className="text-xl text-gray-400">
                  /year
                </span>
              </h3>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Recommendation
                </p>

                <p className="text-xl font-semibold">
                  {result.recommendation}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Monthly Savings
                </p>

                <p className="text-xl font-semibold text-green-400">
                  ${result.savings}/month
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Why We Recommend This
                </p>

                <p className="text-gray-300 leading-relaxed">
                  {result.reason}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm text-gray-400 mb-2">
                  AI-Generated Summary
                </p>

                <p className="text-gray-300 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              <div className="mt-10">
                <SavingsChart
                  monthlySavings={result.savings}
                  annualSavings={result.annualSavings}
                />
              </div>

              <div className="mt-10 border-t border-zinc-800 pt-8">

                <h4 className="text-2xl font-semibold mb-4">
                  Get Full Audit Report
                </h4>

                <p className="text-gray-400 mb-6">
                  Enter your email to receive your AI savings report.
                </p>

                <div className="flex gap-4">

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                  />

                  <button
                    onClick={async () => {

                      if (!email || !result || !reportId) {
                        return;
                      }

                      try {

                        await fetch("/api/send-email", {
                          method: "POST",

                          headers: {
                            "Content-Type": "application/json",
                          },

                          body: JSON.stringify({
                            email,
                            recommendation: result.recommendation,
                            savings: result.savings,
                            summary: result.summary,
                            reportLink:
                              `${window.location.origin}/report/${reportId}`,
                          }),
                        });

                        alert("Email sent successfully!");

                      } catch (error) {

                        alert("Failed to send email");
                      }
                    }}
                    className="bg-white text-black px-6 rounded-xl font-semibold"
                  >
                    Send Report
                  </button>

                </div>

              </div>

              {reportId && (
                <div className="mt-8 border-t border-zinc-800 pt-6">

                  <p className="text-sm text-gray-400 mb-2">
                    Shareable Report Link
                  </p>

                  <a
                    href={`/report/${reportId}`}
                    target="_blank"
                    className="text-green-400 break-all underline"
                  >
                    {window.location.origin}/report/{reportId}
                  </a>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}