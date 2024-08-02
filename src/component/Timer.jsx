import React, { useEffect, useState } from "react";
import { calculateFontSize } from "../helper/calculateFontSize";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function Timer({ time }) {


  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateRestTime = () => {
    const diff = time - Date.now();

    const hours = Math.floor(diff / HOUR);
    const minutes = Math.floor((diff - HOUR * hours) / MINUTE);
    const seconds = Math.floor(
      (diff - hours * HOUR - minutes * MINUTE) / SECOND
    );

    setTimer({
      hours,
      minutes,
      seconds,
    });
  };

  useEffect(() => {
    const interval = setInterval(calculateRestTime, 1000);
    const diff = time - Date.now();

    if (diff < 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);


  const smallCountFontSize = calculateFontSize(`${timer.hours}${timer.minutes}${timer.seconds}` , 14, 6);

  return (
    <span style={{fontSize:smallCountFontSize}} className={`flex flex-row items-center`}>
          <span>{timer.hours}ч</span>
      <span>:</span>
      <span>{timer.minutes}м</span>
      <span>:</span>
      <span>{timer.seconds}с</span>
    </span>
  );
}
