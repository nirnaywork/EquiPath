import { CheckCircle2, BookOpen, Trophy, AlertTriangle, ExternalLink, Briefcase } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
// Use explicit generic for data to avoid deep nested type conflicts while pleasing the ESLint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RoadmapDisplay({ data, onReset }: { data: Record<string, any>; onReset: () => void }) {

    if (data.status === "explore") {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Explore These Domains</h2>
                    <p className="mt-2 text-foreground/70">Based on your year, here are great starting points.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.suggestions.map((s: Record<string, unknown>, i: number) => (
                        <div key={i} className="glass p-6 rounded-2xl border-t-4 border-t-accent">
                            <h3 className="text-xl font-bold text-accent mb-2">{s.domain_name as string}</h3>
                            <p className="text-sm text-foreground/80 mb-4">{s.pitch as string}</p>
                            {(s.beginner_friendly as boolean) && (
                                <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                                    Beginner Friendly
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button onClick={onReset} className="text-accent hover:underline text-sm font-semibold">
                        Try Another Domain
                    </button>
                </div>
            </div>
        );
    }

    // Roadmap Status
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 pb-24">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-accent">{data.domain}</h2>
                <p className="text-lg font-medium">Target: {data.target_year}</p>
                <p className="max-w-3xl mx-auto text-foreground/70 text-balance leading-relaxed">
                    {data.overview}
                </p>
            </div>

            {/* Timeline Phases */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                    <CheckCircle2 className="text-accent" /> Learning Phases
                </h3>
                <div className="grid gap-4">
                    {data.roadmap_phases?.map((phase: Record<string, unknown>, i: number) => (
                        <div key={i} className="glass p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-colors" />
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                    <h4 className="text-xl font-bold">{phase.phase_name as string}</h4>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {(phase.topics_to_learn as string[])?.map((topic: string, j: number) => (
                                            <span key={j} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="shrink-0 text-sm font-mono text-accent/80 bg-accent/10 px-3 py-1 rounded-lg self-start">
                                    ⏱️ {phase.estimated_timeframe as string}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                    <Trophy className="text-yellow-500" /> Resume-Worthy Projects
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Minor Projects */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground/80">Minor Projects</h4>
                        {(data.projects?.minor_projects as Record<string, unknown>[])?.map((proj: Record<string, unknown>, i: number) => (
                            <div key={i} className="glass p-5 rounded-xl border-l-2 border-l-white/20">
                                <h5 className="font-bold mb-1">{proj.title as string}</h5>
                                <p className="text-sm text-foreground/60">{proj.description as string}</p>
                            </div>
                        ))}
                    </div>

                    {/* Major Project */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground/80">Capstone Project</h4>
                        <div className="glass p-6 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/5 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="h-24 w-24" />
                            </div>
                            <div className="relative z-10">
                                <h5 className="text-xl font-bold text-yellow-400 mb-2">{data.projects?.major_project?.title as string}</h5>
                                <p className="text-foreground/80 mb-4">{data.projects?.major_project?.description as string}</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.projects?.major_project?.key_technologies?.map((tech: string, i: number) => (
                                        <span key={i} className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources & Risks Split */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                        <BookOpen className="text-blue-400" /> Free Resources
                    </h3>
                    <ul className="space-y-3">
                        {(data.free_resources as Record<string, unknown>[])?.map((res: Record<string, unknown>, i: number) => (
                            <li key={i} className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                                <div>
                                    <div className="font-semibold">{res.name as string}</div>
                                    <div className="text-xs text-foreground/50">{res.type as string}</div>
                                </div>
                                <a
                                    href={(res.url_or_search_term as string).startsWith('http') ? (res.url_or_search_term as string) : `https://www.google.com/search?q=${encodeURIComponent(res.url_or_search_term as string)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity p-2"
                                >
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                        <AlertTriangle className="text-red-400" /> Risks &amp; Challenges
                    </h3>
                    <Accordion.Root type="single" collapsible className="space-y-2">
                        {data.risks_and_challenges?.map((risk: string, i: number) => (
                            <Accordion.Item value={`item-${i}`} key={i} className="glass rounded-xl overflow-hidden border border-red-500/20">
                                <Accordion.Header>
                                    <Accordion.Trigger className="w-full text-left p-4 font-medium flex justify-between items-center bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                        <span>{risk.split(':')[0] || `Challenge ${i + 1}`}</span>
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="p-4 pt-0 text-sm text-foreground/70 bg-red-500/5">
                                    {risk}
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </section>
            </div>

            {/* 3rd/4th Year Internship Strategy */}
            {data.internship_strategy && (
                <section className="mt-12 glass p-8 rounded-3xl border-2 border-secondary-glow/30 bg-secondary-glow/5">
                    <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                        <Briefcase className="h-6 w-6" /> Internship & Job Strategy
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                        {data.internship_strategy}
                    </p>

                    <h4 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-3">Deep Links (Auto-Filtered)</h4>
                    <div className="flex flex-wrap gap-3">
                        <a href={`https://internshala.com/internships/keywords-${encodeURIComponent(data.domain)}`} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                            Internshala <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(data.domain)}`} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                            LinkedIn <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={`https://wellfound.com/role/${encodeURIComponent(data.domain.split(' ')[0])}`} target="_blank" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                            WellFound <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </section>
            )}

            <div className="pt-8 text-center border-t border-white/10">
                <button onClick={onReset} className="text-foreground/50 hover:text-white transition-colors">
                    Start New Roadmap
                </button>
            </div>
        </div>
    );
}
