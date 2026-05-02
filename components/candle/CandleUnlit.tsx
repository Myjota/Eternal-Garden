"use client";

import "./candle.css";

export function CandleUnlit() {
  return (
    <div className="candle-wrapper">
      
      {/* 🧱 SAME SCALE AS LIT */}
      <div className="candle unlit candle-small">

        {/* WAX */}
        <div className="wax">
          <div className="wax-top cold" />
        </div>

        {/* WICK */}
        <div className="wick cold" />

        {/* GLOW (kept for consistency, but subtle in CSS) */}
        <div className="glow" />

      </div>
    </div>
  );
}
