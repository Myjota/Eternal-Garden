"use client";

import { useState } from "react";
import { CandleLit, CandleUnlit } from "./Candle";

type CandleSectionProps = {
  initialLit?: boolean;
  onLight?: () => void;
};

/* ========================= 🕯️ SINGLE CANDLE SECTION ========================= */

export function CandleSection({
  initialLit = false,
  onLight,
}: CandleSectionProps) {
  const [isLit, setIsLit] = useState(initialLit);
  const [loading, setLoading] = useState(false);

  async function handleLight() {
    if (isLit) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    setIsLit(true);
    setLoading(false);

    onLight?.();
  }

  return (
    <section className="candle-section py-12 flex flex-col items-center">

      {/* CONTAINER */}
      <div className="relative isolate flex flex-col items-center">

        {/* TITLE */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-xl font-serif">🕯️ Uždegti žvakę</h2>
          <p className="text-sm text-muted-foreground">
            Pagerbk atminimą uždegdamas žvakę
          </p>
        </div>

        {/* 🕯️ CANDLE BOX */}
        <div className="relative z-20 mb-6 flex justify-center">
          <div className="relative w-[120px] h-[240px] overflow-hidden flex justify-center items-start">
            {isLit ? <CandleLit /> : <CandleUnlit />}
          </div>
        </div>

        {/* BUTTON */}
        {!isLit && (
          <button
            onClick={handleLight}
            disabled={loading}
            className="relative z-10 px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Uždegama..." : "Uždegti žvakę"}
          </button>
        )}

        {/* MESSAGE */}
        {isLit && (
          <p className="text-sm text-muted-foreground mt-2 relative z-10">
            🕯️ Žvakė uždegta atminimui
          </p>
        )}

      </div>
    </section>
  );
}
