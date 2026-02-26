"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { X, Compass, Briefcase, Bell, CalendarClock, ArrowRight } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const stats = [
  { value: "AI", label: "Powered Roadmaps" },
  { value: "100%", label: "Free Forever" },
  { value: "Live", label: "Job Listings" },
  { value: "24h", label: "Deadline Alerts" },
];

const features = [
  { icon: Compass, label: "Custom Roadmaps", color: "text-accent" },
  { icon: Briefcase, label: "Internships & Jobs", color: "text-blue-400" },
  { icon: Bell, label: "Smart Reminders", color: "text-violet-400" },
  { icon: CalendarClock, label: "AI Scheduler", color: "text-emerald-400" },
];

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in or guest, redirect to dashboard
    const cached = auth.currentUser;
    if (cached) { router.replace("/dashboard"); return; }
    const guestMode = localStorage.getItem("guestMode") === "true";
    if (guestMode) { router.replace("/dashboard"); return; }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleGuest = () => {
    localStorage.setItem("guestMode", "true");
    router.push("/dashboard");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] relative overflow-hidden bg-[#0A0A0A]">

      {/* ── Background orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb w-[700px] h-[700px] bg-accent/6 -top-48 -left-24" />
        <div className="orb w-[500px] h-[500px] bg-blue-500/5 top-1/2 -right-32" />
        <div className="orb w-[400px] h-[400px] bg-violet-500/4 bottom-0 left-1/3" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-16 pb-8 max-w-[1400px] mx-auto w-full">

        {/* Badge */}
        <div className="mb-8">
          <span className="section-label px-4 py-2 rounded-full border border-accent/20 bg-accent/8 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
            Free for every CS student
          </span>
        </div>

        {/* Massive heading */}
        <h1
          className="font-extrabold leading-[0.95] mb-8 uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Your CS Career,{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient">Engineered.</span>
        </h1>

        {/* Subtext + CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 mb-16">
          <p className="text-base sm:text-lg text-foreground/50 max-w-md leading-relaxed">
            Roadmaps, job listings, smart reminders, and an AI scheduler — all built for CS students.
            <span className="text-foreground/80 font-medium"> No paywalls. Ever.</span>
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={openModal}
              className="btn-primary px-7 py-3.5 text-base font-bold"
            >
              Get Started — Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleGuest}
              className="text-sm text-foreground/35 hover:text-foreground/60 transition-colors"
            >
              Browse as guest →
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 border-t border-white/8 pt-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span
                className="text-3xl sm:text-4xl font-extrabold text-gradient"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </span>
              <span className="text-sm text-foreground/40">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section className="border-t border-white/6 py-8 px-6 sm:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-6 sm:gap-10">
          <span className="text-xs text-foreground/30 uppercase tracking-widest hidden sm:block">Includes</span>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className={`flex items-center gap-2 text-sm font-medium ${f.color}`}>
                <Icon className="h-4 w-4" />
                {f.label}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Auth Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in" />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-sm animate-scale-in" style={{ animationFillMode: "both" }}>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
            <AuthCard />
          </div>
        </div>
      )}
    </div>
  );
}
