import React from "react";
import { calculateFontSize } from "../helper/calculateFontSize";
import useTimer from "../hooks/useTimer";

export default function Timer({ time }) {
  const { timer } = useTimer(time);

  const smallCountFontSize = calculateFontSize(`${timer.hours}${timer.minutes}${timer.seconds}`, 14, 6);

  return (
    <span
      style={{ fontSize: smallCountFontSize }}
      className={`flex flex-row items-center`}
    >
      <span>{timer.hours}ч</span>
      <span>:</span>
      <span>{timer.minutes}м</span>
      <span>:</span>
      <span>{timer.seconds}с</span>
    </span>
  );
}
