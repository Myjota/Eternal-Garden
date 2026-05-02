"use client";

import type { MouseEvent, CSSProperties } from "react";
import { useState } from "react";
import "./candle.css";

/* ========================= 🕯️ DEGANČIA ŽVAKĖ ========================= */

export function CandleLit() {
  const [wind, setWind] = useState<number>(0);
  const [flicker, setFlicker] = useState<number>(1);

  /* 🔥 natural flicker */
  useState(() => {
    const interval = setInterval(() => {
      setFlicker(0.85 + Math.random() * 0.3);
    }, 90);

    return () => clearInterval(interval);
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const x = e.clientX;
    const center = window.innerWidth / 2;

    const diff = (x - center) / center;

    setWind((prev) => prev * 0.85 + diff * 0.15);
  }

  return (
    <div className="candle-wrapper" onMouseMove={handleMove}>
      <div
        className="candle lit"
        style={
          {
            "--wind": wind,
            "--flicker": flicker,
          } as CSSProperties
        }
      >
        {/* WAX */}
        <div className="wax">
          <div className="wax-top" />

          <div className="wax-drip drip1" />
          <div className="wax-drip drip2" />
          <div className="wax-drip drip3" />
        </div>

        {/* WICK */}
        <div className="wick" />

        {/* 🔥 FLAME */}
        <div className="flame">
          <div className="flame-layer outer" />
          <div className="flame-layer mid" />
          <div className="flame-layer core" />
          <div className="flame-glow" />
        </div>

        {/* GLOW */}
        <div className="glow" />
      </div>
    </div>
  );
}

/* ========================= ⚫ NEUŽDEGTA ŽVAKĖ ========================= */

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
