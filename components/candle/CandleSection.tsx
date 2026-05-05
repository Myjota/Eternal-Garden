"use client";

import { useState } from "react";
import { CandleLit } from "./Candle";

type CandleSectionProps = {
  initialLit?: boolean;
  onLight?: () => void;
};

export function CandleSection({
  initialLit = false,
  onLight,
}: CandleSectionProps) {
  const [isLit, setIsLit] = useState(initialLit);
  const [loading, setLoading] = useState(false);

  async function handleLight() {
    if (isLit || loading) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    setIsLit(true);
    setLoading(false);

    onLight?.();
  }

  return (
    <section
      className="candle-section pt-4 pb-10 px-6 flex flex-col items-center
                 rounded-2xl border border-amber-200
                 bg-amber-50/60 backdrop-blur-sm
                 shadow-sm"
    >
      <div className="relative isolate flex flex-col items-center max-w-md text-center">

        {/* TITLE (hide after lit) */}
        {!isLit && (
          <div className="mb-3">
            <h2 className="text-xl font-serif">🕯️ Uždegti žvakę</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pagerbk atminimą uždegdamas žvakę
            </p>
          </div>
        )}

        {/* BEFORE LIT */}
        {!isLit && (
          <button
            onClick={handleLight}
            disabled={loading}
            aria-busy={loading}
            className="mt-4 px-6 py-2 rounded-md
                       bg-amber-500 text-white
                       hover:bg-amber-600
                       transition disabled:opacity-50"
          >
            {loading ? "Uždegama..." : "Uždegti žvakę"}
          </button>
        )}

        {/* AFTER LIT */}
        {isLit && (
          <>
            <div className="mt-6 flex justify-center">
              <CandleLit />
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              🕯️ Žvakė uždegta atminimui
            </p>
          </>
        )}

      </div>
    </section>
  );
}
