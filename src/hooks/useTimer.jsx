import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function useTimer(time, workFlag = true) {
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

    if (diff < 0 || !workFlag) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, workFlag]);

  return { timer };
}
