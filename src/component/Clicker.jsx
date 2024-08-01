import React, { memo, useEffect, useState } from "react";
import { Icon } from "../component/IconSprite";

import coin1 from "../assets/coins/coin1.png";
import coin2 from "../assets/coins/coin2.png";
import coin3 from "../assets/coins/coin3.png";
import coin4 from "../assets/coins/coin4.png";
import coin5 from "../assets/coins/coin5.png";
import coin6 from "../assets/coins/coin6.png";
import coin7 from "../assets/coins/coin7.png";
import coin8 from "../assets/coins/coin8.png";
import coin9 from "../assets/coins/coin9.png";
import coin10 from "../assets/coins/coin10.png";
import coin11 from "../assets/coins/coin11.png";
import coin12 from "../assets/coins/coin12.png";
import Coin from "./Coin";

const tg = window.Telegram.WebApp;

function Clicker({ handleClick, allSteps, person }) {
  const [showedCoins, setShowedCoins] = useState([]);

  const coins = [
    coin1,
    coin2,
    coin3,
    coin4,
    coin5,
    coin6,
    coin7,
    coin8,
    coin9,
    coin10,
    coin11,
    coin12,
  ];

  const circleRandomCoordinates = (e, i) => {
    const sign = i % 2 === 0 ? -1 : 1;

    const halfCircle = Math.PI / 180;
    const elWidth = e.target.getBoundingClientRect().width;
    const elHalfWidth = elWidth / 2;

    const randomAngel = Math.floor(Math.random() * 90);
    const randomDistance = Math.floor(Math.random() * 15 + elHalfWidth);

    const x = elHalfWidth + randomDistance * Math.cos(randomAngel * halfCircle) * sign;
    const y = elWidth - randomDistance * Math.sin(randomAngel * halfCircle);

    return [x, y];
  };

  const generateNewCoin = (e, i) => {
    const randomImageIndex = Math.floor(Math.random() * coins.length);
    const [x, y] = circleRandomCoordinates(e, i);

    const newCoin = {
      id: String(Date.now() * (x / (i + 1)) + y),
      position: {
        x,
        y,
      },
      img: coins[randomImageIndex],
    };

    return newCoin;
  };

  const mamothClick = (e) => {
    if(allSteps > 0){
      const newCoins = [];

      handleClick();

      for (let i = 0; i < 5; i++) {
        newCoins.push(generateNewCoin(e, i));
      }

      setShowedCoins((prevCoins) => [...prevCoins, ...newCoins]);
      tg.HapticFeedback.notificationOccurred("warning");
      //navigator.vibrate(100);
    }
  };

  const mamothAutoClick = () => {
    if(allSteps > 0){
      const newCoins = [];

      for (let i = 0; i < 5; i++) {
        const randomImageIndex = Math.floor(Math.random() * coins.length);

        const sign = i % 2 === 0 ? -1 : 1;

        const halfCircle = Math.PI / 180;
        const elWidth = 300;
        const elHalfWidth = elWidth / 2;

        const randomAngel = Math.floor(Math.random() * 90);
        const randomDistance = Math.floor(Math.random() * 15 + elHalfWidth);

        const x = elHalfWidth + randomDistance * Math.cos(randomAngel * halfCircle) * sign;
        const y = elWidth - randomDistance * Math.sin(randomAngel * halfCircle);

        const newCoin = {
          id: String(Date.now() * (x / (i + 1)) + y),
          position: {
            x,
            y,
          },
          img: coins[randomImageIndex],
        };
        newCoins.push(newCoin);
      }

      setShowedCoins((prevCoins) => [...prevCoins, ...newCoins]);
    }
  };

  const handleAnimationEnd = (id) => {
    setShowedCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (person.autoclick){
        mamothAutoClick()
        
      }
    }, 300);

    return () => {
      clearInterval(id);
    };
  })

  return (
    <button onTouchStart={mamothClick} className="flex-1 relative active:scale-[.98] duration-[0]">
      {showedCoins.map((coin) => (
        <Coin
          key={coin.id}
          id={coin.id}
          position={coin.position}
          img={coin.img}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
      <Icon name={"big-mamoth"} size={"100%"} />
    </button>
  );
}

export default memo(Clicker);
