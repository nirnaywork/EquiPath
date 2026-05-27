"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Briefcase, Bell, CalendarClock, LogOut, User as UserIcon, Pencil, Check, X, ChevronDown, LayoutDashboard } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { getCalendarEvents } from "@/lib/calendar";
import { getCachedUsername, setCachedUsername, clearUserCache, fetchUsernameOnce } from "@/lib/userCache";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc, getDocFromCache, updateDoc, setDoc } from "firebase/firestore";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>("");
    const [isGuest, setIsGuest] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [saving, setSaving] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const emailFallback = (email: string) =>
            email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

        // Fast path
        const cached = auth.currentUser;
        if (cached) {
            setUser(cached);
            if (cached.displayName) setUsername(cached.displayName);
            else if (cached.email) setUsername(emailFallback(cached.email));
        } else {
            const guestMode = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true";
            if (guestMode) { setIsGuest(true); setUsername("Guest"); }
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setIsGuest(false);
                // Instant display from cache (no network)
                const cachedName = getCachedUsername(currentUser.uid);
                if (cachedName) setUsername(cachedName);
                else if (currentUser.displayName) setUsername(currentUser.displayName);
                else if (currentUser.email) setUsername(emailFallback(currentUser.email));
                else setUsername("Student");

                // Single coalesced Firestore read — cache-first when available
                try {
                    const name = await fetchUsernameOnce(currentUser.uid, async () => {
                        const userRef = doc(db, "users", currentUser.uid);
                        try {
                            const cached = await getDocFromCache(userRef);
                            if (cached.exists() && cached.data().username) return cached.data().username;
                        } catch { /* no cache */ }
                        const userDoc = await getDoc(userRef);
                        if (userDoc.exists() && userDoc.data().username) return userDoc.data().username;
                        if (currentUser.displayName) return currentUser.displayName;
                        if (currentUser.email) return emailFallback(currentUser.email);
                        return "Student";
                    });
                    if (name) setUsername(name);
                } catch {
                    if (currentUser.displayName) setUsername(currentUser.displayName);
                    else if (currentUser.email) setUsername(emailFallback(currentUser.email));
                    else setUsername("Student");
                }
            } else {
                const guestMode = typeof window !== "undefined" && localStorage.getItem("guestMode") === "true";
                setIsGuest(guestMode);
                if (guestMode) setUsername("Guest");
                else {
                    setUsername("");
                    clearUserCache();
                }
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false); setEditMode(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("guestMode");
        clearUserCache();
        await signOut(auth);
        router.push("/");
    };

    const handleExitGuest = () => {
        localStorage.removeItem("guestMode");
        setIsGuest(false);
        router.push("/");
    };

    const handleEditSave = async () => {
        if (!user || !editValue.trim()) return;
        setSaving(true);
        try {
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);
            if (snap.exists()) await updateDoc(userRef, { username: editValue.trim() });
            else await setDoc(userRef, { username: editValue.trim(), email: user.email, createdAt: new Date().toISOString() });
            setCachedUsername(user.uid, editValue.trim());
            setUsername(editValue.trim());
            setEditMode(false);
            setDropdownOpen(false);
        } catch (e) { console.error("Failed to update username:", e); }
        finally { setSaving(false); }
    };

    const openEdit = () => { setEditValue(username); setEditMode(true); };

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/calendar", label: "Calendar", icon: CalendarClock },
        { href: "/roadmaps", label: "Roadmaps", icon: Compass },
        { href: "/internships", label: "Internships", icon: Briefcase },
    ];

    const prefetchCalendar = () => {
        const u = auth.currentUser;
        if (u) getCalendarEvents(u.uid).catch(() => { });
    };

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
            ? "border-b border-white/8 bg-[#0A0A0A]/90 backdrop-blur-xl"
            : "bg-transparent"
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        <span className="text-gradient">Equi</span>
                        <span className="text-foreground">Path</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={link.href === "/calendar" ? prefetchCalendar : undefined}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? "text-accent bg-accent/10"
                                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => { setDropdownOpen(!dropdownOpen); setEditMode(false); }}
                                className={`flex items-center gap-2 pl-3 pr-2 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${dropdownOpen
                                    ? "border-accent/40 bg-accent/10 text-accent"
                                    : "border-white/10 bg-white/5 text-foreground/80 hover:border-white/20 hover:bg-white/8"
                                    }`}
                            >
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent/80 to-accent/40 flex items-center justify-center text-[10px] font-bold text-background">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block max-w-[100px] truncate">{username}</span>
                                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-68 animate-scale-in"
                                    style={{ animationFillMode: "both" }}>
                                    <div className="rounded-2xl border border-white/10 bg-[#111111]/98 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
                                        <div className="p-4 border-b border-white/8">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/80 to-accent/30 flex items-center justify-center text-sm font-bold text-background flex-shrink-0">
                                                    {username.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground truncate">{username}</p>
                                                    <p className="text-xs text-foreground/40 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            {!editMode ? (
                                                <button onClick={openEdit}
                                                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs text-foreground/60 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all duration-200">
                                                    <Pencil className="h-3 w-3" /> Edit display name
                                                </button>
                                            ) : (
                                                <div className="space-y-2">
                                                    <input autoFocus value={editValue}
                                                        onChange={e => setEditValue(e.target.value)}
                                                        onKeyDown={e => { if (e.key === "Enter") handleEditSave(); if (e.key === "Escape") setEditMode(false); }}
                                                        className="input-field text-xs py-2" placeholder="Display name" />
                                                    <div className="flex gap-2">
                                                        <button onClick={handleEditSave} disabled={saving || !editValue.trim()}
                                                            className="flex-1 btn-primary py-1.5 text-xs disabled:opacity-40">
                                                            <Check className="h-3 w-3" />{saving ? "Saving…" : "Save"}
                                                        </button>
                                                        <button onClick={() => setEditMode(false)}
                                                            className="flex-1 btn-outline py-1.5 text-xs">
                                                            <X className="h-3 w-3" />Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200">
                                            <LogOut className="h-4 w-4" /> Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : isGuest ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-foreground/40 border border-white/8">
                                <UserIcon className="w-3 h-3" /> Guest
                            </span>
                            <button onClick={handleExitGuest} className="btn-primary text-xs px-5 py-2">
                                Sign In
                            </button>
                        </div>
                    ) : (
                        <Link href="/?login=true" onClick={() => localStorage.removeItem("guestMode")} className="btn-primary text-xs px-5 py-2">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
