import React, { memo, useState } from "react";
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
import CoinWeight from "./CoinWeight";

function Clicker({ handleClick }) {
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

  const mamothClick = (e) => {
    const clickBoxSize = e.target.getBoundingClientRect();
    const randomImageIndex = Math.floor(Math.random() * coins.length);
    const randomYPosition = Math.floor(
      Math.random() * (clickBoxSize.height - 200) + 200
    );
    const randomXPosition = Math.floor(
      Math.random() * (clickBoxSize.width - 100) + 50
    );

    handleClick();
    const newCoin = {
      id: Date.now(),
      position: {
        x: randomXPosition,
        y: randomYPosition,
      },
      img: coins[randomImageIndex],
    };
    setShowedCoins((prevCoins) => [...prevCoins, newCoin]);
  };

  const handleAnimationEnd = (id) => {
    setShowedCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
  };

  return (
    <button onClick={mamothClick} className="flex-1 relative">
      {showedCoins.map((coin) => <Coin
            key={coin.id}
            id={coin.id}
            position={coin.position}
            img={coin.img}
            onAnimationEnd={handleAnimationEnd}
          />
      )}
      {showedCoins.map((coin) => <CoinWeight
            key={coin.id}
            id={coin.id}
            position={coin.position}
            count={15}
          />
      )}
      
      <Icon name={"big-mamoth"} size={"100%"} />
    </button>
  );
}

export default memo(Clicker);
