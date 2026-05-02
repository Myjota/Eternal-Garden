"use client";

import "./candle.css";

export function CandleUnlit() {
  return (
    <div className="candle-wrapper">
      <div className="candle unlit">
        <div className="wax">
          <div className="wax-top cold" />
        </div>

        <div className="wick cold" />
        <div className="glow" />
      </div>
    </div>
  );
}
