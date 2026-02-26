"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Briefcase, Bell, Calendar } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/roadmaps", label: "Roadmaps", icon: Compass },
        { href: "/internships", label: "Internships / Jobs", icon: Briefcase },
        { href: "/reminders", label: "Remind Me", icon: Bell },
        { href: "/scheduler", label: "Smart Scheduler", icon: Calendar },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-accent">
                        EquiPath
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
