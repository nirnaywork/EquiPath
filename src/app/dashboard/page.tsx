"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { CalendarClock, Compass, Briefcase, ArrowRight } from "lucide-react";

const features = [
    {
        href: "/scheduler",
        icon: CalendarClock,
        label: "Smart Scheduler",
        description: "AI-powered weekly plan built around your deadlines, energy, and goals.",
        color: "text-accent",
        border: "hover:border-accent/30",
        bg: "bg-accent/10",
        glow: "hover:shadow-[0_8px_48px_rgba(200,169,110,0.15)]",
    },
    {
        href: "/roadmaps",
        icon: Compass,
        label: "Roadmaps",
        description: "Get a personalized CS learning path scoped to your year and domain.",
        color: "text-blue-400",
        border: "hover:border-blue-400/30",
        bg: "bg-blue-500/10",
        glow: "hover:shadow-[0_8px_48px_rgba(96,165,250,0.15)]",
    },
    {
        href: "/internships",
        icon: Briefcase,
        label: "Internships",
        description: "Discover live internship and job listings matched to your skills.",
        color: "text-violet-400",
        border: "hover:border-violet-400/30",
        bg: "bg-violet-500/10",
        glow: "hover:shadow-[0_8px_48px_rgba(167,139,250,0.15)]",
    },
];

export default function DashboardPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [titleReady, setTitleReady] = useState(false);

    const emailFallback = (email: string) =>
        email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const resolveUsername = async (user: { uid: string; displayName: string | null; email: string | null }) => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists() && userDoc.data().username) { setUsername(userDoc.data().username); return; }
        } catch { /* offline */ }
        if (user.displayName) setUsername(user.displayName);
        else if (user.email) setUsername(emailFallback(user.email));
    };

    useEffect(() => {
        const isGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true";
        if (isGuest && !auth.currentUser) {
            setUsername("Guest");
            setTimeout(() => setTitleReady(true), 80);
        }

        const cached = auth.currentUser;
        if (cached) {
            if (cached.displayName) setUsername(cached.displayName);
            else if (cached.email) setUsername(emailFallback(cached.email));
            setTimeout(() => setTitleReady(true), 80);
            resolveUsername(cached);
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                const stillGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true";
                if (!stillGuest) { router.replace("/"); return; }
                if (stillGuest && !titleReady) { setUsername("Guest"); setTimeout(() => setTitleReady(true), 80); }
                return;
            }
            localStorage.removeItem("guestMode");
            if (!titleReady) {
                if (user.displayName) setUsername(user.displayName);
                else if (user.email) setUsername(emailFallback(user.email));
                setTimeout(() => setTitleReady(true), 80);
                resolveUsername(user);
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* ── Background ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="orb w-[700px] h-[700px] bg-accent/7 -top-48 left-1/2 -translate-x-1/2" />
                <div className="orb w-[400px] h-[400px] bg-blue-500/5 bottom-24 -left-20" />
                <div className="orb w-[300px] h-[300px] bg-violet-500/5 bottom-0 right-0" />
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            {/* ── Hero ── */}
            <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className={`flex flex-col items-center gap-6 transition-all duration-700 ease-out ${titleReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/8">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="section-label">Welcome back, {username || "…"}</span>
                    </div>

                    <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-extrabold tracking-tight leading-none" style={{ fontFamily: "var(--font-syne)" }}>
                        Your CS Career,{" "}
                        <span className="text-gradient">Engineered.</span>
                    </h1>

                    <p className="text-lg text-foreground/45 max-w-xl leading-relaxed">
                        Everything you need to plan, learn, and land your dream role — all in one place.
                    </p>

                    <button
                        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                        className="mt-4 flex flex-col items-center gap-2 text-foreground/30 hover:text-accent transition-colors duration-200"
                    >
                        <span className="text-xs uppercase tracking-[0.2em]">Choose your path</span>
                        <div className="w-px h-8 bg-gradient-to-b from-foreground/20 to-transparent" />
                    </button>
                </div>
            </section>

            {/* ── Feature Cards ── */}
            <section id="features" className="container mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <Link
                                key={f.href}
                                href={f.href}
                                className={`group glass-hover rounded-3xl p-8 border border-transparent ${f.border} ${f.glow} flex flex-col gap-6 transition-all duration-300 opacity-0 animate-fade-up`}
                                style={{ animationDelay: `${200 + i * 100}ms`, animationFillMode: "both" }}
                            >
                                <div className={`inline-flex w-fit rounded-2xl ${f.bg} p-4 ${f.color}`}>
                                    <Icon className="h-7 w-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-2 ${f.color}`}>{f.label}</h3>
                                    <p className="text-sm text-foreground/50 leading-relaxed">{f.description}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 text-sm font-semibold ${f.color} opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0`}>
                                    Open <ArrowRight className="h-4 w-4" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
