"use client";

import { useState, useEffect } from "react";
import { CandleLit, CandleUnlit } from "./Candle";

type CandleSectionProps = {
  initialLit?: boolean;
  onLight?: () => void;
};

type RecentUser = {
  id: string;
  name: string;
  timeAgo: string;
  avatar?: string;
};

type CandleStats = {
  currentlyBurning: number;
  totalLit: number;
};

export function CandleSection({
  initialLit = false,
  onLight,
}: CandleSectionProps) {
  const [isLit, setIsLit] = useState(initialLit);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<CandleStats>({
    currentlyBurning: 12,
    totalLit: 2853
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([
    { id: "1", name: "Agnė", timeAgo: "prieš 2 min.", avatar: "/api/placeholder/32/32" },
    { id: "2", name: "Marius", timeAgo: "prieš 5 min.", avatar: "/api/placeholder/32/32" }
  ]);

  async function handleLight() {
    if (isLit || loading) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    setIsLit(true);
    setLoading(false);

    // Update stats
    setStats(prev => ({
      currentlyBurning: prev.currentlyBurning + 1,
      totalLit: prev.totalLit + 1
    }));

    // Add current user to recent
    const newUser: RecentUser = {
      id: Date.now().toString(),
      name: "Jūs",
      timeAgo: "ką tik",
      avatar: "/api/placeholder/32/32"
    };
    setRecentUsers(prev => [newUser, ...prev.slice(0, 1)]);

    onLight?.();
  }

  return (
    <section className="candle-section-full relative min-h-[400px] bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/tree.jpeg')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 p-8 flex flex-col items-center justify-between min-h-[400px]">
        
        {/* Top stats */}
        <div className="w-full flex justify-between items-center text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            <span>Dega dabar <strong>{stats.currentlyBurning}</strong> žmonių</span>
          </div>
          <div>
            Viso uždegta <strong>{stats.totalLit}</strong> žvakės
          </div>
        </div>

        {/* Center candle */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {isLit ? <CandleLit /> : <CandleUnlit />}
            
            {/* Flowers decoration around candle */}
            <div className="absolute -top-4 -left-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -top-2 -right-6 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 left-4 w-8 h-8 bg-green-500/20 rounded-full blur-lg"></div>
            <div className="absolute -bottom-2 right-8 w-10 h-10 bg-green-500/20 rounded-full blur-lg"></div>
          </div>

          {!isLit && (
            <button
              onClick={handleLight}
              disabled={loading}
              aria-busy={loading}
              className="mt-8 px-8 py-3 rounded-full
                         bg-gradient-to-r from-orange-500 to-amber-500 text-white
                         hover:from-orange-600 hover:to-amber-600
                         transition-all duration-300 disabled:opacity-50
                         shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? "Uždegama..." : "Uždegti žvakę"}
            </button>
          )}

          {isLit && (
            <p className="mt-6 text-white/80 text-sm text-center">
              🕯️ Žvakė uždegta atminimui
            </p>
          )}
        </div>

        {/* Bottom recent activity */}
        <div className="w-full flex items-center justify-between text-white/70 text-xs">
          <div className="flex items-center gap-3">
            <span>Paskutinę žvakę uždegė <strong>{recentUsers[0]?.name}</strong> {recentUsers[0]?.timeAgo}</span>
          </div>
          <div className="flex gap-2">
            {recentUsers.slice(0, 2).map((user) => (
              <div
                key={user.id}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-semibold text-xs"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
