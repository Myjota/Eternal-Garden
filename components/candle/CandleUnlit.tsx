"use client";

import "./candle.css";

export function CandleUnlit() {
  return (
    <div className="candle-wrapper">

      {/* 🧱 SAME SCALE AS LIT */}
      <div className="candle unlit candle-small">

        {/* 🌿 GARDEN HOLDER (IMPORTANT for consistency) */}
        <div className="candle-holder" />

        {/* 🧈 WAX */}
        <div className="wax">
          <div className="wax-top cold" />
        </div>

        {/* 🔥 ANCHOR (wick stays visible in unlit state) */}
        <div className="flame-anchor">
          <div className="wick cold" />
        </div>

        {/* ✨ GLOW (very subtle in CSS when unlit) */}
        <div className="glow" />

      </div>
    </div>
  );
}
