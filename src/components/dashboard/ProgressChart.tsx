"use client";

import { useMemo } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

export interface ChartDataPoint {
    date: string;
    roadmapId: string;
    domain: string;
    phaseName: string;
    progress: number;
}

interface Props {
    dataPoints: ChartDataPoint[];
}

const COLORS = ["#C8A96E", "#60A5FA", "#A78BFA", "#F87171", "#34D399", "#FBBF24"];

export default function ProgressChart({ dataPoints }: Props) {
    const chartData = useMemo(() => {
        if (dataPoints.length === 0) return [];

        // Group by date, merge all roadmap progresses
        const domains = [...new Set(dataPoints.map(dp => dp.domain))];
        const dateMap = new Map<string, Record<string, number>>();

        // Track last known progress per domain
        const lastProgress: Record<string, number> = {};

        const sorted = [...dataPoints].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        sorted.forEach(dp => {
            const dateLabel = new Date(dp.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            lastProgress[dp.domain] = dp.progress;

            if (!dateMap.has(dateLabel)) {
                dateMap.set(dateLabel, { ...lastProgress });
            } else {
                dateMap.get(dateLabel)![dp.domain] = dp.progress;
            }
        });

        return Array.from(dateMap.entries()).map(([date, values]) => ({
            date,
            ...values
        }));
    }, [dataPoints]);

    const domains = [...new Set(dataPoints.map(dp => dp.domain))];

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                📈 Learning Progress Over Time
            </h2>

            {dataPoints.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-foreground/30 text-sm">
                    Complete your first roadmap phase to see your progress here.
                </div>
            ) : (
                <div>
                    <div className="flex flex-wrap gap-4 mb-4">
                        {domains.map((d, i) => (
                            <div key={d} className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                <span className="text-foreground/60">{d}</span>
                            </div>
                        ))}
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                                tickLine={false}
                            />
                            <YAxis
                                domain={[0, 100]}
                                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                                tickLine={false}
                                tickFormatter={(v) => `${v}%`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1C1C1E",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    color: "#fff",
                                }}
                                formatter={(value, name) => [`${value}%`, name]}
                            />
                            {domains.map((domain, i) => (
                                <Line
                                    key={domain}
                                    type="monotone"
                                    dataKey={domain}
                                    stroke={COLORS[i % COLORS.length]}
                                    strokeWidth={2}
                                    dot={{ fill: COLORS[i % COLORS.length], r: 4 }}
                                    activeDot={{ r: 6 }}
                                    connectNulls
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
