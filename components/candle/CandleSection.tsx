"use client";

import { useState, useEffect } from "react";
import { CandleLit, CandleUnlit } from "./Candle";
import { useCandlesData } from "@/hooks/useCandlesData";
import { createClient } from "@/lib/supabase/client";

type CandleSectionProps = {
  memorialId: string;
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
  memorialId,
  initialLit = false,
  onLight,
}: CandleSectionProps) {
  const [isLit, setIsLit] = useState(initialLit);
  const [loading, setLoading] = useState(false);
  
  // Use real data from Supabase
  const { stats, recentUsers, currentUser, loading: dataLoading, error, lightCandle, getUserCandleStatus } = useCandlesData(memorialId);

  // Check if current user has already lit a candle
  useEffect(() => {
    if (currentUser && !dataLoading) {
      getUserCandleStatus().then(setIsLit);
    }
  }, [currentUser, dataLoading, getUserCandleStatus]);

  async function handleLight() {
    if (isLit || loading) return;

    setLoading(true);
    
    try {
      // For both authenticated and anonymous users, use name or default
      const userName = currentUser?.name || 'Anonymous';
      const result = await lightCandle(userName);
      
      if (result.success) {
        setIsLit(true);
        onLight?.();
      } else {
        alert(result.error || 'Nepavyko uždegti žvakės');
      }
    } catch (error) {
      console.error('Error lighting candle:', error);
      alert('Nepavyko uždegti žvakės');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="candle-section-full relative min-h-[500px] bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border-2 border-amber-600/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/tree.jpeg')] bg-cover bg-center opacity-10" />
      
      {/* Golden glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent" />
      
      <div className="relative z-10 p-8 flex flex-col items-center justify-between min-h-[400px]">
        
        {/* Top stats */}
        <div className="w-full flex justify-between items-start text-amber-400 text-sm p-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></span>
              <span className="font-semibold">Dega dabar</span>
            </div>
            <span className="text-amber-300 font-bold text-2xl ml-5">{stats.currently_burning}</span>
            <span className="text-amber-400 text-xs ml-5">žmonių</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold mb-1">Viso uždegta</span>
            <span className="text-amber-300 font-bold text-2xl">{stats.total_lit.toLocaleString()}</span>
            <span className="text-amber-400 text-xs">žvakės</span>
          </div>
        </div>

        {/* Center candle */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {isLit ? <CandleLit /> : <CandleUnlit />}
            
            {/* Enhanced flowers decoration around candle */}
            <div className="absolute -top-6 -left-12 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -right-10 w-16 h-16 bg-white/15 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 left-6 w-12 h-12 bg-green-500/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 right-12 w-14 h-14 bg-green-500/25 rounded-full blur-xl"></div>
            <div className="absolute -top-8 left-8 w-8 h-8 bg-amber-400/10 rounded-full blur-lg"></div>
            <div className="absolute -bottom-8 right-6 w-10 h-10 bg-amber-400/10 rounded-full blur-lg"></div>
          </div>

          {!isLit && (
            <button
              onClick={handleLight}
              disabled={loading || dataLoading}
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

          {!currentUser && !dataLoading && (
            <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
              <p className="text-amber-300 text-center text-xs">
                Žvakė bus uždegta anonimiškai
              </p>
            </div>
          )}

                  </div>

        {/* Bottom recent activity */}
        <div className="w-full flex items-center justify-between text-amber-400 text-xs p-4 rounded-lg bg-black/30 backdrop-blur-md border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {recentUsers.slice(0, 2).map((user, index) => (
                <div
                  key={user.id}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 ${index === 0 ? 'border-amber-300 shadow-lg shadow-amber-300/50' : 'border-amber-300/30'} flex items-center justify-center text-xs font-bold text-amber-900`}
                >
                  {index === 0 ? '★' : '👤'}
                </div>
              ))}
            </div>
            <div>
              <span className="text-amber-400">Paskutinę žvakę uždegė </span>
              <span className="text-amber-300 font-semibold">{recentUsers[0]?.name}</span>
              <span className="text-amber-400 ml-1">{recentUsers[0]?.time_ago}</span>
            </div>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-red-900/80 p-4 rounded-lg border border-red-500/50">
              <p className="text-red-200 text-center">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Bandyti iš naujo
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
