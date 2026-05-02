"use client";

import { Candle } from "./Candle";
import { CandleUnlit } from "./CandleUnlit";

type CandleSectionProps = {
  candles?: Array<{
    id: string;
    is_lit: boolean;
  }>;
};

/* ========================= 🕯️ CANDLE SECTION ========================= */

export function CandleSection({ candles }: CandleSectionProps) {
  // fallback demo jei dar nėra data
  const demo = candles?.length
    ? candles
    : [
        { id: "1", is_lit: true },
        { id: "2", is_lit: false },
        { id: "3", is_lit: true },
        { id: "4", is_lit: false },
      ];

  return (
    <section className="candle-section py-12">
      <div className="text-center mb-8">
        <h2 className="text-xl font-serif">🕯️ Žvakių sekcija</h2>
        <p className="text-sm text-muted-foreground">
          Uždegtos ir neuždegtos atminimo žvakės
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {demo.map((candle) => (
          <div
            key={candle.id}
            className="scale-90 hover:scale-105 transition duration-300"
          >
            {candle.is_lit ? <Candle /> : <CandleUnlit />}
          </div>
        ))}
      </div>
    </section>
  );
}
