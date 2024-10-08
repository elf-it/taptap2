import React, { useEffect, useState } from 'react';
import '../App.css';
import Mamont from '../icons/Mamont'
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, mamont } from '../images';
import Info from '../icons/Info';
import Settings from '../icons/Settings';
import { getAutoclick } from '../lib/fetch';

const tg = window.Telegram.WebApp;

export default function Main(){
  const levelNames = [
    "begin",
    "silver",
    "gold",
    "platinum",
    "black",
    "ultima"
  ];

  const levelMinPoints = [
    3,
    600,
    1200,
    2400,
    10000,
    1000000
  ];

  const [levelIndex, setLevelIndex] = useState(3);
  const [points, setPoints] = useState(70002335);
  const [clicks, setClicks] = useState([]);
  const pointsToAdd = 11;

  const profitPerHour = 125500;

  //const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");
  const [autoclick, setAutoclick] = useState(false);

  const calculateProgress = () => {
    if(levelIndex >= levelNames.length - 1){
      return 100;
    }
    const curentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - curentLevelMin) / (nextLevelMin - curentLevelMin) * 100);
    return Math.min(progress, 100);
  };

  const formatProfitPerHour = (profit) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  const calculateTimeLeft = (targetHour) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if(now.getUTCHours() >= targetHour){
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  }

  const handleCardClick = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, {id: Date.now(), x: e.pageX, y: e.pageY}]);
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const getAutoclickT = async () => {
    const response = await getAutoclick({tid: tg.initDataUnsafe?.user?.id})
    if(response.error){
      console.log(response.error);
    }else{
      setAutoclick(response.status);
    }
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyCipherTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));

      updateCountdowns();
      const interval = setInterval(updateCountdowns, 60000);

      return () => clearInterval(interval);
    }
    getAutoclickT()
  }, []);

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if(points >= nextLevelMin && levelIndex < levelNames.length - 1){
      setLevelIndex(levelIndex + 1);
    }else if(points < currentLevelMin && levelIndex > 0){
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  return(
    <div className='bg-[url("./images/bg-2.png")] bg-cover bg-fixed flex justify-center'>
      <div className='w-full text-white h-screen font-bold flex flex-col max-w-xl'>
        <div className='px-4 z-10'>
          <div className='flex items-center space-x-2 pt-4'>
            <div className='p-1 rounded-lg'>
              <Mamont size={36} className='text-[#d4d4d4]' />
            </div>
            <div>
              <p className='text-sm'>{tg.initDataUnsafe?.user?.username ? tg.initDataUnsafe?.user?.username : tg.initDataUnsafe?.user?.first_name}</p>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-4 mt-1'>
            <div className='flex items-center w-1/3'>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='text-sm'>{levelNames[levelIndex]}</p>
                  <p className='text-sm'>{levelIndex + 1} <span className='text-[#95908a]'>/ {levelNames.length}</span></p>
                </div>
                <div className='flex items-center mt-1 border-2 border-[#43433b]/[0.6] rounded-full'>
                  <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
                    <div className='progress-gradient h-2 rounded-full' style={{width: `${calculateProgress()}%`}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'>
              <img src={binanceLogo} alt='Exchange' className='w-8 h-8' />
              <div className='flex-1 text-center'>
                <p className='text-xs text-[#85827d] font-medium'>Profit per hour</p>
                <div className='flex items-center justify-center space-x-1'>
                  <img src={dollarCoin} alt='Dollar Coin' className='w-[18px] h-[18px]' />
                  <p className='text-sm'>{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className='text-[#43433b]' />
                </div>
              </div>
              <Settings className='text-white' />
            </div>
          </div>
        </div>
        <div className='flex-grow mt-4 rounded-t-[48px] relative z-0'>
          <div className='absolute top-[2px] left-0 right-0 bottom-0 rounded-t-[46px]'>
            <div className='px-4 mt-6 flex justify-between gap-2'>
              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
                <div className='dot'></div>
                <img src={dailyReward} alt='Daily Reward' className='mx-auto w-12 h-12' />
                <p className='text-[10px] text-center text-white mt-1'>Autoclick</p>
                <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{autoclick ? "On" : "Off"}</p>
              </div>
              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
                <div className='dot'></div>
                <img src={dailyCipher} alt='Daily Cipher' className='mx-auto w-12 h-12' />
                <p className='text-[10px] text-center text-white mt-1'>Daily cipher</p>
                <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{dailyCipherTimeLeft}</p>
              </div>
              <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
                <div className='dot'></div>
                <img src={dailyCombo} alt='Daily Combo' className='mx-auto w-12 h-12' />
                <p className='text-[10px] text-center text-white mt-1'>Daily combo</p>
                <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>{dailyComboTimeLeft}</p>
              </div>
            </div>
            <div className='px-4 mt-4 flex justify-center'>
              <div className='px-4 py-2 flex items-center space-x-2'>
                <img src={dollarCoin} alt='Dollar Coin' className='w-10 h-10' />
                <p className='text-4xl text-white'>{points.toLocaleString()}</p>
              </div>
            </div>
            <div className='px-4 mt-4 flex justify-center'>
              <div className='w-100 h-100 p-4 rounded-full' onClick={handleCardClick}>
                <div className='w-full h-full'>
                  <img src={mamont} alt='Mamont' className='w-full h-full' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {clicks.map((click) => (
      <div key={click.id} onAnimationEnd={() => handleAnimationEnd(click.id)}>
        <div
          className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float1 1s ease-out`
          }}
          >
          {pointsToAdd}
        </div>
        <div
          className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x + 28}px`,
            animation: `float2 1s ease-out`
          }}
          >
          {pointsToAdd}
        </div>
      </div>))}
    </div>
  );
}