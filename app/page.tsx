import Hero from "@/components/Hero";
import AuditForm from "@/components/AuditForm";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />

      <div className="px-6 pb-24">
        <AuditForm />
      </div>
    </main>
  );
}