export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          AI Spend Optimization
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Stop Overspending
          <br />
          on AI Tools
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Audit your AI stack instantly and discover where your startup can save thousands every year.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Start Free Audit
          </button>

          <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}