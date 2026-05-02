"use client";

import "./candle.css";

export function CandleUnlit() {
  return (
    <div className="candle-wrapper">

      {/* 🧱 SAME SCALE AS LIT */}
      <div className="candle unlit candle-small">

        {/* 🌿 GARDEN HOLDER */}
        <div className="candle-holder" />

        {/* 🌿 GRASS TUFT (CONSISTENT WITH LIT) */}
        <div className="grass-tuft">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* 🧈 WAX */}
        <div className="wax">
          <div className="wax-top cold" />
        </div>

        {/* 🔥 ANCHOR (wick visible in unlit state) */}
        <div className="flame-anchor">
          <div className="wick cold" />
        </div>

        {/* ✨ GLOW */}
        <div className="glow" />

      </div>
    </div>
  );
}
