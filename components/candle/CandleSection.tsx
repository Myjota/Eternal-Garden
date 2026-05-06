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
    <section className="memorial-section memorial-candle-section">
      <div className="memorial-container">
        
        {/* SECTION TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          Uždekite žvakę
        </h2>

        {/* Stats row */}
        <div className="candle-stats">
          <div className="candle-stat">
            <span className="candle-stat-indicator"></span>
            <div className="candle-stat-content">
              <span className="candle-stat-label">Dega dabar</span>
              <span className="candle-stat-value">{stats.currently_burning}</span>
            </div>
          </div>
          <div className="candle-stat candle-stat-right">
            <div className="candle-stat-content">
              <span className="candle-stat-label">Viso uždegta</span>
              <span className="candle-stat-value">{stats.total_lit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Center candle */}
        <div className="candle-display">
          <div className="candle-wrapper">
            {isLit ? <CandleLit /> : <CandleUnlit />}
          </div>

          {!isLit && (
            <button
              onClick={handleLight}
              disabled={loading || dataLoading}
              aria-busy={loading}
              className="candle-light-button"
            >
              {loading ? "Uždegama..." : "Uždegti žvakę"}
            </button>
          )}

          {!currentUser && !dataLoading && (
            <p className="candle-anonymous-notice">
              Žvakė bus uždegta anonimiškai
            </p>
          )}
        </div>

        {/* Recent activity */}
        {recentUsers.length > 0 && (
          <div className="candle-recent">
            <div className="candle-recent-avatars">
              {recentUsers.slice(0, 2).map((user, index) => (
                <div
                  key={user.id}
                  className={`candle-recent-avatar ${index === 0 ? 'candle-recent-avatar-first' : ''}`}
                >
                  {index === 0 ? '★' : '♦'}
                </div>
              ))}
            </div>
            <p className="candle-recent-text">
              Paskutinę žvakę uždegė{' '}
              <strong>{recentUsers[0]?.name}</strong>
              <span className="candle-recent-time">{recentUsers[0]?.time_ago}</span>
            </p>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="candle-error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Bandyti iš naujo
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
