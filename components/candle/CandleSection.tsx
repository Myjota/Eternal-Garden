"use client";

import { useState, useEffect } from "react";
import { CandleLit, CandleUnlit } from "./Candle";
import { useCandlesData } from "@/hooks/useCandlesData";

type CandleSectionProps = {
  memorialId: string;
  initialLit?: boolean;
  onLight?: () => void;
};

export function CandleSection({
  memorialId,
  initialLit = false,
  onLight,
}: CandleSectionProps) {
  const [isLit, setIsLit] = useState(initialLit);
  const [loading, setLoading] = useState(false);

  // Real Supabase data
  const {
    stats,
    recentUsers,
    currentUser,
    loading: dataLoading,
    error,
    lightCandle,
    getUserCandleStatus,
  } = useCandlesData(memorialId);

  // Check if user already lit candle
  useEffect(() => {
    if (currentUser && !dataLoading) {
      getUserCandleStatus().then(setIsLit);
    }
  }, [currentUser, dataLoading, getUserCandleStatus]);

  async function handleLight() {
    if (isLit || loading) return;

    setLoading(true);

    try {
      const userName = currentUser?.name || "Anonymous";

      const result = await lightCandle(userName);

      if (result.success) {
        setIsLit(true);
        onLight?.();
      } else {
        alert(result.error || "Nepavyko uždegti žvakės");
      }
    } catch (error) {
      console.error("Error lighting candle:", error);
      alert("Nepavyko uždegti žvakės");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="memorial-section memorial-candle-section">
      <div className="memorial-container">
        
        {/* TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          Uždekite žvakę
        </h2>

        {/* CENTER CANDLE */}
        <div className="candle-display">
          <div
            className={`candle-wrapper ${
              isLit ? "candle-wrapper-lit" : ""
            }`}
          >
            {isLit ? <CandleLit /> : <CandleUnlit />}
          </div>

          {!isLit && (
            <button
              onClick={handleLight}
              disabled={loading || dataLoading}
              aria-busy={loading}
              className={`candle-light-button ${
                loading ? "candle-light-button-loading" : ""
              }`}
            >
              Uždegti žvakę
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="candle-stats">
          <div className="candle-stat">
            <span className="candle-stat-indicator"></span>

            <div className="candle-stat-content">
              <span className="candle-stat-label">
                Dega dabar
              </span>

              <span className="candle-stat-value">
                {stats.currently_burning}
              </span>
            </div>
          </div>

          <div className="candle-stat candle-stat-right">
            <div className="candle-stat-content">
              <span className="candle-stat-label">
                Viso uždegta
              </span>

              <span className="candle-stat-value">
                {stats.total_lit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        {recentUsers.length > 0 && (
          <div className="candle-recent">
            <p className="candle-recent-text">
              Paskutinę žvakę uždegė{" "}
              <strong>{recentUsers[0]?.name}</strong>

              <span className="candle-recent-time">
                {recentUsers[0]?.time_ago}
              </span>
            </p>
          </div>
        )}

        {/* ERROR */}
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
