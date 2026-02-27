"use client";

import { useState } from "react";
import { Search, MapPin, Building2, ExternalLink, Briefcase, Plus, X, Loader2 } from "lucide-react";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];
const DOMAINS = [
    "Software Development (Web/Mobile/Desktop)", "AI/ML", "Data Science & Analytics",
    "Cloud Computing", "Cybersecurity", "DevOps & SRE", "Blockchain & Web3",
    "UI/UX Design", "IoT", "AR/VR", "Game Development", "Database & Data Engineering",
    "Networking & Telecom", "Hardware & Embedded Systems", "Robotics & Automation",
    "IT Support & SysAdmin", "QA & Testing", "Tech Product Management"
];

interface Job {
    title: string;
    description: string;
    redirect_url: string;
    salary_min?: number;
    company: { display_name: string };
    location: { display_name: string };
}

export default function InternshipsPage() {
    const [year, setYear] = useState<string>("");
    const [domain, setDomain] = useState<string>("");

    // Skills Chip State
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState<string[]>([]);

    // New Search Filters
    const [isRemote, setIsRemote] = useState(false);
    const [location, setLocation] = useState<"in" | "us">("in"); // India or Global (US fallback for broader search)

    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [fallbackLinks, setFallbackLinks] = useState(false);

    const addSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
        // Both Enter key and mouse click can add a skill
        if ('key' in e && e.key !== "Enter") return;
        e.preventDefault();
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const isJunior = year === "1st Year" || year === "2nd Year";

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!year || !domain) return;

        setHasSearched(true);

        if (isJunior) {
            // Show static guides, no API call needed
            return;
        }

        // Call API for 3rd/4th years
        setIsLoading(true);
        setJobs([]);
        setFallbackLinks(false);

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain, skills, country: location, remote: isRemote })
            });

            if (!res.ok) throw new Error("API failed");

            const data = await res.json();
            if (data.jobs && data.jobs.length > 0) {
                setJobs(data.jobs);
            } else {
                setFallbackLinks(true);
            }
        } catch (err) {
            console.error(err);
            setFallbackLinks(true); // Fallback if API fails
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Find Your <span className="text-blue-500">Opportunity</span>
                </h1>
                <p className="mt-4 text-lg text-foreground/70">
                    Tailored internships & junior roles based on your experience level.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Left Sidebar Form */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 lg:sticky lg:top-24">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-400" /> Filters
                    </h2>

                    <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Year of Study</label>
                            <select
                                title="Year of Study"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                required
                            >
                                <option value="" disabled>Select your year</option>
                                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Domain</label>
                            <select
                                title="Domain"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                required
                            >
                                <option value="" disabled>Select domain</option>
                                {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Location</label>
                            <select
                                title="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value as "in" | "us")}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            >
                                <option value="in">🇮🇳 India</option>
                                <option value="us">🌍 Global</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isRemote}
                                        onChange={(e) => setIsRemote(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 transition-colors"></div>
                                </div>
                                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">Remote Only</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/80 mb-2">Skills (Optional)</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={addSkill}
                                    placeholder="e.g. React, Python"
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    title="Add Skill"
                                    onClick={addSkill}
                                    className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <span key={skill} className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-200 text-xs px-2 py-1 rounded-md border border-blue-500/30">
                                        {skill}
                                        <button type="button" aria-label={`Remove ${skill}`} onClick={() => removeSkill(skill)} className="hover:text-white">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] flex justify-center items-center gap-2"
                        >
                            <Briefcase className="h-5 w-5" /> Find Opportunities
                        </button>
                    </form>
                </div>

                {/* Right Content Area */}
                <div className="col-span-1 lg:col-span-3 min-h-[50vh]">
                    {!hasSearched ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border-dashed border-2 border-white/10">
                            <Search className="h-16 w-16 text-foreground/20 mb-4" />
                            <h3 className="text-xl font-bold text-foreground/60">Fill out your filters to begin</h3>
                            <p className="text-sm text-foreground/40 mt-2">We&apos;ll show you exactly the types of opportunities you should be looking for.</p>
                        </div>
                    ) : isJunior ? (
                        /* Junior View: Static Educational Guidelines & Hackathons */
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-2xl">
                                <h3 className="text-2xl font-bold text-green-400">Foundation First</h3>
                                <p className="mt-2 text-foreground/80">
                                    As a {year}, your best ROI is participating in Hackathons, Open Source, and targeted exploratory programs rather than standard professional roles.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Google Summer of Code */}
                                <a href="https://summerofcode.withgoogle.com/" target="_blank" rel="noreferrer" className="glass group block p-6 rounded-2xl transition-all hover:-translate-y-1 hover:border-blue-400/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold text-blue-400">Google Summer of Code</h4>
                                        <ExternalLink className="h-5 w-5 text-foreground/30 group-hover:text-blue-400" />
                                    </div>
                                    <p className="text-sm text-foreground/70 mb-4">A global, online program focused on bringing new contributors into open source software development.</p>
                                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full">Remote • Paid Stipend</span>
                                </a>

                                {/* MLH Hackathons */}
                                <a href="https://mlh.io/seasons/2024/events" target="_blank" rel="noreferrer" className="glass group block p-6 rounded-2xl transition-all hover:-translate-y-1 hover:border-purple-400/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold text-purple-400">MLH Hackathons</h4>
                                        <ExternalLink className="h-5 w-5 text-foreground/30 group-hover:text-purple-400" />
                                    </div>
                                    <p className="text-sm text-foreground/70 mb-4">Major League Hacking events are the best way to build a project over a weekend and network.</p>
                                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full">Global • Weekends</span>
                                </a>

                                {/* Microsoft Learn Student Ambassadors */}
                                <a href="https://mvp.microsoft.com/studentambassadors" target="_blank" rel="noreferrer" className="glass group block p-6 rounded-2xl transition-all hover:-translate-y-1 hover:border-cyan-400/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold text-cyan-400">Microsoft Student Ambassadors</h4>
                                        <ExternalLink className="h-5 w-5 text-foreground/30 group-hover:text-cyan-400" />
                                    </div>
                                    <p className="text-sm text-foreground/70 mb-4">Lead your local tech community, host workshops, and build your technical reputation.</p>
                                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full">Leadership • Community</span>
                                </a>

                                {/* FreeCodeCamp Contributions */}
                                <a href="https://contribute.freecodecamp.org/" target="_blank" rel="noreferrer" className="glass group block p-6 rounded-2xl transition-all hover:-translate-y-1 hover:border-green-400/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold text-green-400">Open Source (Good First Issues)</h4>
                                        <ExternalLink className="h-5 w-5 text-foreground/30 group-hover:text-green-400" />
                                    </div>
                                    <p className="text-sm text-foreground/70 mb-4">Start contributing to massive open source projects like FreeCodeCamp to buff your GitHub graph.</p>
                                    <span className="text-xs bg-white/5 px-3 py-1 rounded-full">Open Source • Resume Builder</span>
                                </a>
                            </div>
                        </div>
                    ) : (
                        /* Senior View: API Results or Fallbacks */
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            {isLoading ? (
                                <div className="h-64 flex flex-col items-center justify-center">
                                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                                    <p className="text-foreground/60">Scouring matching roles for you...</p>
                                </div>
                            ) : fallbackLinks ? (
                                /* Fallback View (if API Empty or Failed) */
                                <div className="space-y-6">
                                    <div className="bg-orange-500/10 border-l-4 border-orange-500 p-6 rounded-r-2xl">
                                        <h3 className="text-xl font-bold text-orange-400">Real-time fetch unavaibale right now</h3>
                                        <p className="mt-2 text-foreground/80 text-sm">
                                            But don&apos;t worry, we&apos;ve prepared targeted searches precisely for your query! Click below to see live results immediately.
                                        </p>
                                    </div>
                                    <div className="grid gap-4">
                                        <a href={`https://internshala.com/internships/keywords-${encodeURIComponent(domain)}${isRemote ? '-work-from-home' : ''}`} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-blue-400/50 transition-colors">
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Internshala</h4>
                                                <p className="text-sm text-foreground/60">{domain} {isRemote ? "Remote " : ""}Roles in {location === "in" ? "India" : "Global"}</p>
                                            </div>
                                            <ExternalLink className="h-6 w-6 text-foreground/30 group-hover:text-blue-400" />
                                        </a>
                                        <a href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(domain)}${location === "in" ? "&location=India" : ""}${isRemote ? "&f_WT=2" : ""}`} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-blue-600/50 transition-colors">
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">LinkedIn Jobs</h4>
                                                <p className="text-sm text-foreground/60">{location === "in" ? "Indian" : "Global"} {isRemote ? "Remote " : ""}Roles for {domain}</p>
                                            </div>
                                            <ExternalLink className="h-6 w-6 text-foreground/30 group-hover:text-blue-500" />
                                        </a>
                                        <a href={`https://wellfound.com/role/${encodeURIComponent(domain.split(' ')[0])}`} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-black/50 transition-colors">
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">WellFound (Startups)</h4>
                                                <p className="text-sm text-foreground/60">High-growth startups looking for {domain}</p>
                                            </div>
                                            <ExternalLink className="h-6 w-6 text-foreground/30 group-hover:text-white" />
                                        </a>
                                        <a href={`https://www.freshersworld.com/jobs?skill=${encodeURIComponent(domain)}`} target="_blank" rel="noreferrer" className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-green-400/50 transition-colors">
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">FreshersWorld</h4>
                                                <p className="text-sm text-foreground/60">Entry level jobs tailored for freshers</p>
                                            </div>
                                            <ExternalLink className="h-6 w-6 text-foreground/30 group-hover:text-green-400" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                /* Real API Data View */
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold">Found <span className="text-blue-400">{jobs.length}</span> Matches</h3>
                                        <span className="text-sm text-foreground/50">Powered by Adzuna</span>
                                    </div>
                                    {jobs.map((job, idx) => (
                                        <div key={idx} className="glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
                                            <div className="space-y-2 flex-1">
                                                <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{job.title}</h4>
                                                <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                                                    <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company.display_name}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location.display_name}</span>
                                                </div>
                                                <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{job.description}</p>
                                            </div>
                                            <div className="shrink-0 flex flex-col items-end gap-2">
                                                <a
                                                    href={job.redirect_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    Apply Now <ExternalLink className="h-4 w-4" />
                                                </a>
                                                {job.salary_min && (
                                                    <span className="text-xs text-green-400 font-mono">
                                                        ${job.salary_min.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
