import React from "react";

export default function CoinWeight({ id, position, count }) {
  return (
    <p
      className="absolute text-5xl font-bold opacity-0 text-[#FFCC48] font-comic pointer-events-none"
      style={{
        top: `${position.y - 100}px`,
        left: `${position.x -100}px`,
        animation: `float .7s ease-out`,
      }}
    >+{count}</p>
  );
}
