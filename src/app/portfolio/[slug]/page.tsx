"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { Download, Mail, Trophy, CheckCircle2, Circle, TrendingUp } from "lucide-react";

// Dynamic imports
const ProgressChart = dynamic(() => import("@/components/dashboard/ProgressChart"), { ssr: false });

interface PortfolioData {
    username: string;
    email?: string;
    skills?: { id: string; name: string }[];
    roadmaps?: {
        id: string;
        domain: string;
        year: string;
        phases: { name: string; completed: boolean; completedAt: string | null }[];
        finishedAt: string | null;
    }[];
    chartData?: { date: string; roadmapId: string; domain: string; phaseName: string; progress: number }[];
}

interface PortfolioSettings {
    resumePublic: boolean;
    skillsPublic: boolean;
    chartPublic: boolean;
    roadmapsPublic: boolean;
    portfolioPublic: boolean;
}

const DEFAULT_SETTINGS: PortfolioSettings = {
    resumePublic: false,
    skillsPublic: true,
    chartPublic: true,
    roadmapsPublic: true,
    portfolioPublic: true,
};

export default function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const searchParams = useSearchParams();
    const [data, setData] = useState<PortfolioData | null>(null);
    const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadPortfolio = async () => {
            // Load settings first
            const storedSettings = localStorage.getItem("equipath_portfolio_settings");
            if (storedSettings) {
                try {
                    setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) });
                } catch {}
            }

            // Find user by username slug
            const slug = resolvedParams.slug;
            
            try {
                // Try to find user by querying Firestore
                // Since we don't have a username index, we'll try common approaches
                // For now, check if portfolio is even enabled
                if (!settings.portfolioPublic) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                // Query all users (in production, use a usernames collection)
                // For now, show a placeholder since we need proper user lookup
                setData({
                    username: slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                });
            } catch (e) {
                console.error("Portfolio error:", e);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, [resolvedParams.slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-pulse text-foreground/50">Loading portfolio...</div>
                </div>
            </div>
        );
    }

    if (notFound || !settings.portfolioPublic) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
                    <p className="text-foreground/60">This portfolio doesn't exist or is set to private.</p>
                </div>
            </div>
        );
    }

    const activeRoadmaps = data?.roadmaps?.filter(r => !r.finishedAt) || [];
    const completedRoadmaps = data?.roadmaps?.filter(r => r.finishedAt) || [];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            
            <main className="container mx-auto max-w-3xl px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent/80 to-accent/40 flex items-center justify-center text-3xl font-bold text-background mb-4">
                        {data?.username?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <h1 className="text-3xl font-bold">{data?.username || "Student"}</h1>
                    <p className="text-foreground/60 mt-2">Portfolio powered by EquiPath</p>
                </div>

                {/* Skills Section */}
                {settings.skillsPublic && data?.skills && data.skills.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                            🛠️ Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span key={skill.id} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Roadmaps Section */}
                {settings.roadmapsPublic && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                            🗺️ Learning Roadmaps
                        </h2>
                        
                        {/* Active Roadmaps */}
                        {activeRoadmaps.length > 0 && (
                            <div className="space-y-4 mb-6">
                                {activeRoadmaps.map((roadmap) => {
                                    const completedCount = roadmap.phases.filter(p => p.completed).length;
                                    const progress = Math.round((completedCount / roadmap.phases.length) * 100);
                                    
                                    return (
                                        <div key={roadmap.id} className="glass rounded-2xl p-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold">📌 {roadmap.domain}</h3>
                                                <span className="text-xs text-foreground/50">{roadmap.year}</span>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {roadmap.phases.map((phase, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        {phase.completed ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                                                        ) : (
                                                            <Circle className="h-4 w-4 text-foreground/30" />
                                                        )}
                                                        <span className={phase.completed ? "text-foreground/60" : ""}>
                                                            {phase.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="mt-3">
                                                <div className="flex justify-between text-xs text-foreground/50 mb-1">
                                                    <span>Progress</span>
                                                    <span className="text-accent">{progress}%</span>
                                                </div>
                                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-accent rounded-full transition-all"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Completed Roadmaps */}
                        {completedRoadmaps.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                                    🏆 Completed
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {completedRoadmaps.map((roadmap) => (
                                        <div key={roadmap.id} className="glass rounded-xl p-4 flex items-center gap-3">
                                            <Trophy className="h-5 w-5 text-yellow-500" />
                                            <div>
                                                <p className="font-semibold text-sm">{roadmap.domain}</p>
                                                <p className="text-xs text-foreground/50">Finished: {roadmap.finishedAt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeRoadmaps.length === 0 && completedRoadmaps.length === 0 && (
                            <p className="text-foreground/40 text-sm">No roadmaps added yet.</p>
                        )}
                    </section>
                )}

                {/* Progress Chart */}
                {settings.chartPublic && data?.chartData && data.chartData.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                            📈 Progress Over Time
                        </h2>
                        <ProgressChart dataPoints={data.chartData} />
                    </section>
                )}

                {/* Resume Section - Request Only */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                        📄 Resume
                    </h2>
                    <div className="glass rounded-2xl p-6 text-center">
                        {settings.resumePublic ? (
                            <div>
                                <Download className="h-8 w-8 mx-auto mb-2 text-accent" />
                                <p className="mb-3">Resume available</p>
                                <button className="btn-primary">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Resume
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Mail className="h-8 w-8 mx-auto mb-2 text-foreground/40" />
                                <p className="mb-3 text-foreground/60">Resume not publicly available</p>
                                {data?.email && (
                                    <a 
                                        href={`mailto:${data.email}?subject=Resume Request — EquiPath&body=Hi, I found your EquiPath portfolio and would like to request your resume.`}
                                        className="btn-outline"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Request Resume
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-white/10">
                    <p className="text-foreground/40 text-sm">
                        Powered by <span className="text-accent">EquiPath</span> 🚀
                    </p>
                </div>
            </main>
        </div>
    );
}
