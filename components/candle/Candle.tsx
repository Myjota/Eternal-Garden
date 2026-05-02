"use client";

import type { MouseEvent, CSSProperties } from "react";
import { useEffect, useState } from "react";
import "./candle.css";

/* ========================= 🕯️ LIT ========================= */

export function CandleLit() {
  const [wind, setWind] = useState(0);
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(0.88 + Math.random() * 0.25);
    }, 90);

    return () => clearInterval(interval);
  }, []);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const x = e.clientX;
    const center = window.innerWidth / 2;
    const diff = (x - center) / center;

    setWind((prev) => prev * 0.85 + diff * 0.15);
  }

  return (
    <div className="candle-wrapper" onMouseMove={handleMove}>
      <div
        className="candle lit candle-small"
        style={
          {
            "--wind": wind,
            "--flicker": flicker,
          } as CSSProperties
        }
      >
        {/* 🧈 WAX */}
        <div className="wax">
          <div className="wax-top" />
          <div className="wax-drip drip1" />
          <div className="wax-drip drip2" />
          <div className="wax-drip drip3" />
        </div>

        {/* 🔥 ANCHOR (critical fix) */}
        <div className="flame-anchor">
          <div className="wick" />
          <div className="flame">
            <div className="flame-layer outer" />
            <div className="flame-layer mid" />
            <div className="flame-layer core" />
          </div>
        </div>

        {/* ✨ LIGHT */}
        <div className="glow" />
      </div>
    </div>
  );
}

/* ========================= ⚫ UNLIT ========================= */

export function CandleUnlit() {
  return (
    <div className="candle-wrapper">
      <div className="candle unlit candle-small">
        <div className="wax">
          <div className="wax-top cold" />
        </div>

        {/* 🕯️ WICK visible only when unlit */}
        <div className="wick" />

        {/* ✨ minimal glow */}
        <div className="glow" />
      </div>
    </div>
  );
}
