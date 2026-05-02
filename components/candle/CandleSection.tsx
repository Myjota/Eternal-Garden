"use client";

import { useState } from "react";
import { CandleLit } from "./Candle";

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
    <section className="candle-section pt-2 pb-10 flex flex-col items-center">

      <div className="relative isolate flex flex-col items-center max-w-md text-center">

        {/* TITLE */}
        <div className="mb-3">
          <h2 className="text-xl font-serif">🕯️ Uždegti žvakę</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pagerbk atminimą uždegdamas žvakę
          </p>
        </div>

        {/* 🔥 BEFORE LIT → ONLY BUTTON */}
        {!isLit && (
          <button
            onClick={handleLight}
            disabled={loading}
            className="mt-4 px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Uždegama..." : "Uždegti žvakę"}
          </button>
        )}

        {/* 🔥 AFTER LIT → CANDLE + MESSAGE */}
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
