"use client";

import { useEffect, useState } from "react"; import type { MouseEvent } from "react"; import "./candle.css";

/* ========================= 🕯️ DEGANČIA ŽVAKĖ (TSX) ========================= */ export function CandleLit() { const [igniting, setIgniting] = useState<boolean>(true); const [wind, setWind] = useState<number>(0);

useEffect(() => { const t: ReturnType<typeof setTimeout> = setTimeout(() => setIgniting(false), 1200); return () => clearTimeout(t); }, []);

function handleMove(e: MouseEvent<HTMLDivElement>) { const x = e.clientX; const center = window.innerWidth / 2; const diff = (x - center) / center; setWind(diff); }

return ( <div className="candle-wrapper" onMouseMove={handleMove}> <div className={candle lit ${igniting ? "igniting" : ""}} style={{ "--wind": wind } as React.CSSProperties} > <div className="wax"> <div className="wax-top" />

<div className="wax-drip drip1" />
      <div className="wax-drip drip2" />
      <div className="wax-drip drip3" />
    </div>

    <div className="wick" />

    <div className="flame">
      <div className="flame-layer outer" />
      <div className="flame-layer mid" />
      <div className="flame-layer core" />
    </div>

    <div className="glow" />
  </div>
</div>

); }

/* ========================= ⚫ NEUŽDEGTA ŽVAKĖ (TSX) ========================= */ export function CandleUnlit() { return ( <div className="candle-wrapper"> <div className="candle unlit"> <div className="wax"> <div className="wax-top cold" /> </div>

<div className="wick cold" />
    <div className="glow" />
  </div>
</div>

); }
