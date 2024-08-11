import React from "react";
import TimerWithAnim from "./TimerWithAnim";
import useTimer from "../hooks/useTimer";
import { createPortal } from "react-dom";

import rocketIcon from "../assets/icons/icon__rocket.svg";
import BottomSheet from "./BottomSheet";

export default function BustBottomSheet({
  isBottomSheetVisible,
  toggleBottomSheetVisible,
  timestamp,
  lngTitle,
  lngButton
}) {
  const { timer } = useTimer(timestamp, isBottomSheetVisible);
  const secondsIntegers = getIntegers(timer.seconds);
  const minutesIntegers = getIntegers(timer.minutes);
  const hoursIntegers = getIntegers(timer.hours);

  function getIntegers(integer) {
    return {
      units: integer % 10,
      dozens: Math.floor(integer / 10),
    };
  }

  return createPortal(
    <BottomSheet
      image={rocketIcon}
      btnText={lngButton}
      isBottomSheetVisible={isBottomSheetVisible}
      toggleBottomSheetVisible={toggleBottomSheetVisible}
    >
      <div className="flex flex-col items-center mb-[20px]">
        <p className="text-white font-comic text-center">{lngTitle}</p>
        <div className="flex flex-row items-center gap-[10px]">
          <TimerWithAnim integers={hoursIntegers} />
          <span className="text-white text-[32px]">:</span>
          <TimerWithAnim integers={minutesIntegers} />
          <span className="text-white text-[32px]">:</span>
          <TimerWithAnim integers={secondsIntegers} />
        </div>
      </div>
    </BottomSheet>,
    document.body
  );
}
