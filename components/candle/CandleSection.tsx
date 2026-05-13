"use client";

import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);

  // Real Supabase data - userHasLitCandle is now tracked in the hook
  const {
    stats,
    recentUsers,
    currentUser,
    loading: dataLoading,
    error,
    lightCandle,
    userHasLitCandle,
  } = useCandlesData(memorialId);

  // Use the hook's state directly - no need for separate useEffect
  const isLit = userHasLitCandle || initialLit;

  async function handleLight() {
    if (isLit || loading) return;

    setLoading(true);
    setMessage(null);

    try {
      const userName = currentUser?.name || "Anonymous";

      const result = await lightCandle(userName);

      if (result.success) {
        // userHasLitCandle will be updated by the hook automatically
        setMessage({
          type: 'success',
          text: '🕯️ Ačiū už pagarbą! Žvakė šviečia jūsų artimajam.'
        });
        onLight?.();
      } else if (result.alreadyLit) {
        // userHasLitCandle will be updated by the hook automatically
        setMessage({
          type: 'info',
          text: 'Jūs jau uždėgėte žvaką šiam memorialo. 🕯️'
        });
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Nepavyko uždegti žvakės'
        });
      }
    } catch (error) {
      console.error("Error lighting candle:", error);
      setMessage({
        type: 'error',
        text: 'Nepavyko uždegti žvakės'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="memorial-section memorial-candle-section">
      <div className="memorial-container">
        
        {/* TITLE */}
        <h2 className="memorial-section-title memorial-font-heading">
          
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
              {loading ? "Uždegiu..." : "Uždegti žvakę"}
            </button>
          )}

          {isLit && !loading && (
            <div className="candle-already-lit">
              <p className="candle-already-lit-text">
                🕯️ Jūs jau uždėgėte žvaką
              </p>
            </div>
          )}
        </div>

        {/* MESSAGE DISPLAY */}
        {message && (
          <div className={`candle-message candle-message-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && !message && (
          <div className="candle-message candle-message-error">
            {error}
          </div>
        )}

        {/* STATS */}
        <div className="candle-stats">
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
