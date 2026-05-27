"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { auth, db } from "@/lib/firebase";
import { getCachedUsername, fetchUsernameOnce } from "@/lib/userCache";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocFromCache, collection, getDocs } from "firebase/firestore";
import ResumeSection from "@/components/dashboard/ResumeSection";
import SkillsSection from "@/components/dashboard/SkillsSection";
import RoadmapSection from "@/components/dashboard/RoadmapSection";
import PortfolioLinkSection from "@/components/dashboard/PortfolioLinkSection";
import type { ChartDataPoint } from "@/components/dashboard/ProgressChart";
import { setDoc } from "firebase/firestore";
import { UnifiedCalendarEvent, addUnifiedCalendarEvent, getUnifiedCalendarEvents, COLORS } from "@/lib/calendarUnified";
import { Link2, Copy, Eye, Lock, Unlock } from "lucide-react";

// Dynamic imports for chart libs (avoid SSR issues)
const ProgressChart = dynamic(() => import("@/components/dashboard/ProgressChart"), { ssr: false });
const CalendarSection = dynamic(() => import("@/components/dashboard/CalendarSection"), { ssr: false });

export default function DashboardPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [titleReady, setTitleReady] = useState(false);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const isGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true" && !auth.currentUser;

    const emailFallback = (email: string) =>
        email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const resolveUsername = async (user: { uid: string; displayName: string | null; email: string | null }) => {
        const cached = getCachedUsername(user.uid);
        if (cached) { setUsername(cached); return; }
        try {
            const name = await fetchUsernameOnce(user.uid, async () => {
                const userRef = doc(db, "users", user.uid);
                try {
                    const cached = await getDocFromCache(userRef);
                    if (cached.exists() && cached.data().username) return cached.data().username;
                } catch { /* no cache */ }
                const userDoc = await getDoc(userRef);
                if (userDoc.exists() && userDoc.data().username) return userDoc.data().username;
                return user.displayName || (user.email ? emailFallback(user.email) : null);
            });
            if (name) setUsername(name);
        } catch { /* offline */ }
    };

    // Load existing chart data from Firestore/localStorage
    const loadExistingData = useCallback(async () => {
        if (isGuest) {
            const cachedChart = localStorage.getItem("guestChartData");
            if (cachedChart) setChartData(JSON.parse(cachedChart));
            return;
        }
        const user = auth.currentUser;
        if (!user) return;
        try {
            // Load chart data points
            const chartSnap = await getDocs(collection(db, "users", user.uid, "chartData"));
            setChartData(chartSnap.docs.map(d => d.data() as ChartDataPoint));
        } catch { }
    }, [isGuest]);

    useEffect(() => {
        if (isGuest) {
            setUsername("Guest");
            setTimeout(() => setTitleReady(true), 80);
            loadExistingData();
        }

        const cached = auth.currentUser;
        if (cached) {
            if (cached.displayName) setUsername(cached.displayName);
            else if (cached.email) setUsername(emailFallback(cached.email));
            setTimeout(() => setTitleReady(true), 80);
            resolveUsername(cached);
            loadExistingData();
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                const stillGuest = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true";
                if (!stillGuest) { router.replace("/"); return; }
                if (stillGuest && !titleReady) {
                    setUsername("Guest");
                    setTimeout(() => setTitleReady(true), 80);
                }
                return;
            }
            localStorage.removeItem("guestMode");
            if (!titleReady) {
                if (user.displayName) setUsername(user.displayName);
                else if (user.email) setUsername(emailFallback(user.email));
                setTimeout(() => setTitleReady(true), 80);
                resolveUsername(user);
                loadExistingData();
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    // Called when a phase is checked in RoadmapSection
    const handlePhaseComplete = async (
        roadmapId: string, domain: string, phaseName: string, date: string, progress: number
    ) => {
        // Add chart data point
        const newPoint: ChartDataPoint = { date, roadmapId, domain, phaseName, progress };
        setChartData(prev => {
            const updated = [...prev, newPoint];
            if (isGuest) localStorage.setItem("guestChartData", JSON.stringify(updated));
            return updated;
        });

        // Add calendar event to unified storage
        const dateStr = new Date(date).toISOString().split("T")[0];
        addUnifiedCalendarEvent({
            date: dateStr,
            title: `Completed ${phaseName} of ${domain} Roadmap`,
            type: "roadmap",
            color: COLORS.roadmap,
            roadmapId,
        });

        // Persist chart data to Firestore
        if (!isGuest) {
            const user = auth.currentUser;
            if (user) {
                const eventId = `${roadmapId}_${Date.now()}`;
                await setDoc(doc(db, "users", user.uid, "chartData", eventId), newPoint).catch(() => { });
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="orb w-[700px] h-[700px] bg-accent/7 -top-48 left-1/2 -translate-x-1/2" />
                <div className="orb w-[400px] h-[400px] bg-blue-500/5 bottom-24 -left-20" />
                <div className="orb w-[300px] h-[300px] bg-violet-500/5 bottom-0 right-0" />
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            {/* Header */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-4 max-w-7xl mx-auto w-full">
                <div className={`transition-all duration-700 ease-out ${titleReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/8 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="section-label">Dashboard</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        Welcome back, <span className="text-gradient">{username || "…"}</span>
                    </h1>
                    <p className="mt-2 text-foreground/45 text-sm">Your personal command center for tracking progress, managing skills, and staying organized.</p>
                </div>
            </section>

            {/* Portfolio Link Section */}
            {!isGuest && (
                <section className="relative px-4 sm:px-6 lg:px-8 pb-6 max-w-7xl mx-auto w-full">
                    <PortfolioLinkSection username={username} user={auth.currentUser} />
                </section>
            )}

            {/* Guest Banner */}
            {isGuest && (
                <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6">
                    <div className="px-5 py-3 rounded-2xl bg-accent/8 border border-accent/20 text-sm text-accent/90 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Create a free account to save your progress forever.
                        <a href="/?login=true" className="ml-auto text-accent font-semibold underline underline-offset-2 text-xs">Sign Up</a>
                    </div>
                </div>
            )}

            {/* Dashboard Grid */}
            <section className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
                {/* Row 1: Resume + Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ResumeSection />
                    <SkillsSection />
                </div>

                {/* Row 2: Roadmap Management */}
                <div className="mb-6">
                    <RoadmapSection onPhaseComplete={handlePhaseComplete} />
                </div>

                {/* Row 3: Progress Chart */}
                <div className="mb-6">
                    <ProgressChart dataPoints={chartData} />
                </div>

                {/* Row 4: Calendar */}
                <div>
                    <CalendarSection />
                </div>
            </section>
        </div>
    );
}
