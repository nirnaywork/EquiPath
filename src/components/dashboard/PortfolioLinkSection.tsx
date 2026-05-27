"use client";

import { useState, useEffect } from "react";
import { Link2, Copy, Eye, Lock, Unlock, EyeOff, Check } from "lucide-react";
import { User } from "firebase/auth";

interface Props {
    username: string;
    user: User | null;
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

const STORAGE_KEY = "equipath_portfolio_settings";

export default function PortfolioLinkSection({ username, user }: Props) {
    const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
    const [copied, setCopied] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Generate portfolio URL slug
    const portfolioSlug = username 
        ? username.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
        : user?.uid?.slice(0, 8) || "user";
    
    const portfolioUrl = typeof window !== "undefined" 
        ? `${window.location.origin}/portfolio/${portfolioSlug}` 
        : `/portfolio/${portfolioSlug}`;

    // Load settings from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
            } catch {
                // Use defaults
            }
        }
    }, []);

    // Save settings to localStorage
    const saveSettings = (newSettings: PortfolioSettings) => {
        setSettings(newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    };

    const toggleSetting = (key: keyof PortfolioSettings) => {
        saveSettings({ ...settings, [key]: !settings[key] });
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(portfolioUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    };

    if (!settings.portfolioPublic) return null;

    return (
        <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent/10">
                        <Link2 className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wider">Your Portfolio Link</p>
                        <p className="text-sm font-mono text-accent/80 truncate max-w-[200px] sm:max-w-none">
                            {portfolioUrl}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                    >
                        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                    
                    <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                    </a>

                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`btn-outline text-xs px-3 py-2 flex items-center gap-1.5 ${showSettings ? "border-accent/50 bg-accent/10" : ""}`}
                    >
                        {showSettings ? <Lock className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                        Settings
                    </button>
                </div>
            </div>

            {/* Privacy Settings */}
            {showSettings && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                    <p className="text-xs text-foreground/50 mb-3">Portfolio Privacy Controls</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                            onClick={() => toggleSetting("portfolioPublic")}
                            className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                                settings.portfolioPublic 
                                    ? "border-accent/50 bg-accent/10 text-accent" 
                                    : "border-white/10 text-foreground/50"
                            }`}
                        >
                            {settings.portfolioPublic ? <Unlock className="h-3 w-3 inline mr-1" /> : <Lock className="h-3 w-3 inline mr-1" />}
                            Portfolio
                        </button>
                        <button
                            onClick={() => toggleSetting("skillsPublic")}
                            className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                                settings.skillsPublic 
                                    ? "border-accent/50 bg-accent/10 text-accent" 
                                    : "border-white/10 text-foreground/50"
                            }`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => toggleSetting("roadmapsPublic")}
                            className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                                settings.roadmapsPublic 
                                    ? "border-accent/50 bg-accent/10 text-accent" 
                                    : "border-white/10 text-foreground/50"
                            }`}
                        >
                            Roadmaps
                        </button>
                        <button
                            onClick={() => toggleSetting("chartPublic")}
                            className={`text-xs px-3 py-2 rounded-lg border transition-all ${
                                settings.chartPublic 
                                    ? "border-accent/50 bg-accent/10 text-accent" 
                                    : "border-white/10 text-foreground/50"
                            }`}
                        >
                            Progress
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
