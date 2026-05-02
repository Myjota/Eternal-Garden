"use client";

import { useState } from "react";
import { CandleLit } from "./Candle";
import { CandleUnlit } from "./CandleUnlit";

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

    // simulate API / Supabase call
    await new Promise((res) => setTimeout(res, 800));

    setIsLit(true);
    setLoading(false);

    onLight?.();
  }

  return (
    <section className="candle-section py-12 flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-xl font-serif">🕯️ Uždegti žvakę</h2>
        <p className="text-sm text-muted-foreground">
          Pagerbk atminimą uždegdamas žvakę
        </p>
      </div>

      {/* CANDLE */}
      <div className="mb-6">
        {isLit ? <CandleLit /> : <CandleUnlit />}
      </div>

      {/* BUTTON */}
      {!isLit && (
        <button
          onClick={handleLight}
          disabled={loading}
          className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Uždegama..." : "Uždegti žvakę"}
        </button>
      )}

      {/* MESSAGE */}
      {isLit && (
        <p className="text-sm text-muted-foreground mt-2">
          🕯️ Žvakė uždegta atminimui
        </p>
      )}
    </section>
  );
      }
