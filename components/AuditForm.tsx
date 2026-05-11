"use client";

import { generateAudit } from "@/lib/audit";
import { useEffect, useState } from "react";

export default function AuditForm() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState<any>(null);

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

  const handleGenerateAudit = () => {
    const audit = generateAudit(
      tool,
      plan,
      Number(monthlySpend),
      Number(teamSize)
    );

    setResult(audit);
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
          className="bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Generate Audit
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

            </div>
          </div>
        )}

      </div>
    </section>
  );
}