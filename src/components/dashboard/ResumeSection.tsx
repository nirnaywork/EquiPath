"use client";

import { useState, useEffect, useRef } from "react";
import { FileUp, Eye, Download, RefreshCw, AlertCircle, Lock } from "lucide-react";

interface ResumeMeta {
    fileName: string;
    uploadDate: string;
    size: number;
}

const STORAGE_KEY = "equipath_resume";
const META_KEY = "equipath_resume_meta";

export default function ResumeSection() {
    const [resumeData, setResumeData] = useState<string | null>(null);
    const [meta, setMeta] = useState<ResumeMeta | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load resume from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedMeta = localStorage.getItem(META_KEY);
        
        if (stored && storedMeta) {
            setResumeData(stored);
            try {
                setMeta(JSON.parse(storedMeta));
            } catch {
                // Invalid meta, ignore
            }
        }
    }, []);

    const validateFile = (file: File): boolean => {
        if (file.type !== "application/pdf") {
            setError("Only PDF files are accepted. Please upload a valid resume.");
            return false;
        }
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File too large. Maximum size is 10MB.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleUpload = (file: File) => {
        if (!validateFile(file)) return;
        setUploading(true);
        setError(null);

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const base64 = e.target?.result as string;
            
            // Store in localStorage
            try {
                localStorage.setItem(STORAGE_KEY, base64);
                
                const metaObj: ResumeMeta = {
                    fileName: file.name,
                    uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    size: file.size
                };
                localStorage.setItem(META_KEY, JSON.stringify(metaObj));
                
                setResumeData(base64);
                setMeta(metaObj);
            } catch (err) {
                console.error("Storage error:", err);
                setError("Failed to store resume. Storage may be full.");
            } finally {
                setUploading(false);
            }
        };

        reader.onerror = () => {
            setError("Failed to read file. Please try again.");
            setUploading(false);
        };

        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    };

    const handleDownload = () => {
        if (!resumeData || !meta) return;
        
        const link = document.createElement("a");
        link.href = resumeData;
        link.download = meta.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReplace = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                📄 My Resume
            </h2>

            {!resumeData ? (
                <div>
                    {/* Privacy Badge */}
                    <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/8 border border-green-500/20 text-green-400/80 text-xs">
                        <Lock className="h-3.5 w-3.5" />
                        Your resume stays on your device only. We never upload it to any server.
                    </div>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                            dragOver 
                                ? "border-accent bg-accent/10 scale-[1.01]" 
                                : "border-white/10 hover:border-accent/40 hover:bg-white/3"
                        }`}
                    >
                        <FileUp className={`h-10 w-10 mx-auto mb-3 transition-colors ${dragOver ? "text-accent" : "text-foreground/30"}`} />
                        <p className="text-foreground/60 text-sm mb-1">Drag your PDF here</p>
                        <p className="text-foreground/30 text-xs mb-4">— or —</p>
                        <button className="btn-outline text-xs px-6 py-2.5">
                            Browse File
                        </button>
                        
                        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-foreground/40">
                            <span className="flex items-center gap-1">
                                ✓ PDF only
                            </span>
                            <span className="flex items-center gap-1">
                                ✓ Stored locally
                            </span>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {showPreview && (
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                            <iframe
                                src={resumeData}
                                className="w-full h-[400px]"
                                title="Resume Preview"
                            />
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <p className="font-semibold text-sm">{meta?.fileName}</p>
                            <p className="text-xs text-foreground/40">
                                Uploaded {meta?.uploadDate} • {(meta?.size ? (meta.size / 1024).toFixed(1) : "0")} KB
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setShowPreview(!showPreview)}
                                className="btn-outline text-xs px-4 py-2"
                            >
                                <Eye className="h-3.5 w-3.5" /> {showPreview ? "Hide" : "Preview"}
                            </button>
                            <button 
                                onClick={handleDownload}
                                className="btn-outline text-xs px-4 py-2"
                            >
                                <Download className="h-3.5 w-3.5" /> Download
                            </button>
                            <button 
                                onClick={handleReplace}
                                className="btn-primary text-xs px-4 py-2"
                            >
                                <RefreshCw className="h-3.5 w-3.5" /> Replace
                            </button>
                            <input 
                                ref={fileInputRef} 
                                type="file" 
                                accept=".pdf,application/pdf" 
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                                }} 
                            />
                        </div>
                    </div>

                    {/* Privacy Badge for uploaded state */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/8 border border-green-500/20 text-green-400/80 text-xs mt-4">
                        <Lock className="h-3.5 w-3.5" />
                        Your resume is stored locally on this device only.
                    </div>
                </div>
            )}

            {uploading && (
                <div className="mt-4 flex items-center gap-2 text-accent text-sm">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Processing...
                </div>
            )}

            {error && (
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
                </div>
            )}
        </div>
    );
}
