import { supabase } from "@/lib/supabase";

interface ReportPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPage({
  params,
}: ReportPageProps) {

  const { id } = await params;

  const { data } = await supabase
    .from("audit_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Report not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

        <h1 className="text-4xl font-bold mb-8">
          AI Spend Audit Report
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-400">
              Tool
            </p>

            <p className="text-xl font-semibold">
              {data.tool}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Plan
            </p>

            <p className="text-xl font-semibold">
              {data.plan}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Monthly Spend
            </p>

            <p className="text-xl font-semibold">
              ${data.monthly_spend}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Team Size
            </p>

            <p className="text-xl font-semibold">
              {data.team_size}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Recommendation
            </p>

            <p className="text-xl font-semibold text-green-400">
              {data.recommendation}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Monthly Savings
            </p>

            <p className="text-xl font-semibold">
              ${data.savings}/month
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Annual Savings
            </p>

            <p className="text-3xl font-bold text-green-400">
              ${data.annual_savings}/year
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <p className="text-sm text-gray-400 mb-2">
              AI Summary
            </p>

            <p className="text-gray-300 leading-relaxed">
              {data.summary}
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}