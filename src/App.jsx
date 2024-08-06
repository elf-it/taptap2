import './App.css';
import Guide from './pages/Guide';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState, useContext } from 'react';
import { LvlContext } from "./store/levelContext";
import ConnectWallet from './pages/ConnectWallet';
import { getPerson, getSteps, setMyCoins, getLang } from './lib/fetch';
import { Icon } from './component/IconSprite';
import Loading from './pages/Loading';

import AutoFarm from "./pages/AutoFarm";
import Dashboard from "./pages/Dashboard";
import Lottery from "./pages/Lottery";
import Main from "./pages/Main";

import usePreloadImage from "./hooks/usePreloadImage";

import mamothIcon from "./assets/icons/icon__nav-mamoth.svg";
import dashboardIcon from "./assets/icons/icon__nav-dashboard.svg";
import autofarmIcon from "./assets/icons/icon__nav-autofarm.svg";
import lotteryIcon from "./assets/icons/icon__nav-lottery.svg";
import gamesIcon from "./assets/icons/icon__nav-games.svg";

import bgMain1 from './assets/images/bg-main-1.png'
import bgMain2 from './assets/images/bg-main-2.png'
import bgMain3 from './assets/images/bg-main-3.png'
import bgMain4 from './assets/images/bg-main-4.png'
import bgMain5 from './assets/images/bg-main-5.png'
import bgMain6 from './assets/images/bg-main-6.png'

import { imagesList } from "./image-list";
import { LngContext } from './store/langContext';

const tg = window.Telegram.WebApp;

function App() {

  const [level, setLevel] = useContext(LvlContext);
  const [loading] = usePreloadImage(imagesList);

  const [lang, setLang] = useContext(LngContext)

  const getLng = async () => {
    const response = await getLang()
    setLang(response)
  }

  const bgImages = [
    bgMain1,
    bgMain2,
    bgMain3,
    bgMain4,
    bgMain5,
    bgMain6
  ]

  const [numPage, setNumPage] = useState(0);

  const [person, setPerson] = useState(null);

  const [load, setLoad] = useState(true);

  const [touchCoins, setTouchCoins] = useState(0)
  const [allSteps, setAllSteps] = useState(0)
  const [count, setCount] = useState(0)
  const[otherCoins, setOtherCoins] = useState({
    Notcoin: 0,
    Pepe: 0,
    Shiba: 0,
    Dogecoin: 0,
    Dogwifhat: 0,
    Popcat: 0,
    Mog: 0,
    Floki: 0,
    Ponke: 0,
    Mew: 0,
    Bome: 0
  })

  const [step, setStep] = useState(0);

  const [Notcoin_step, setNotcoin_step] = useState(0);
  const [Pepe_step, setPepe_step] = useState(0);
  const [Shiba_step, setShiba_step] = useState(0);
  const [Dogecoin_step, setDogecoin_step] = useState(0);
  const [Dogwifhat_step, setDogwifhat_step] = useState(0);
  const [Popcat_step, setPopcat_step] = useState(0);
  const [Mog_step, setMog_step] = useState(0);
  const [Floki_step, setFloki_step] = useState(0);
  const [Ponke_step, setPonke_step] = useState(0);
  const [Mew_step, setMew_step] = useState(0);
  const [Bome_step, setBome_step] = useState(0);

  const addStep = () => {
    if(step <= allSteps){
      setTouchCoins(touchCoins + step);
      setOtherCoins({
        Notcoin: otherCoins.Notcoin + Notcoin_step,
        Pepe: otherCoins.Pepe + Pepe_step,
        Shiba: otherCoins.Shiba + Shiba_step,
        Dogecoin: otherCoins.Dogecoin + Dogecoin_step,
        Dogwifhat: otherCoins.Dogwifhat + Dogwifhat_step,
        Popcat: otherCoins.Popcat + Popcat_step,
        Mog: otherCoins.Mog + Mog_step,
        Floki: otherCoins.Floki + Floki_step,
        Ponke: otherCoins.Ponke + Ponke_step,
        Mew: otherCoins.Mew + Mew_step,
        Bome: otherCoins.Bome + Bome_step
      });
      setCount(count + step);
      setAllSteps(allSteps - step);
    }
  }

  const routes = [
    {
      path: "/",
      element: <Main setNumPage={setNumPage} person={person} addStep={addStep} count={count} allSteps={allSteps} step={step} />,
      label: "Games",
      icon: mamothIcon,
      visible: true,
    },
    {
      path: "/",
      element: <Dashboard person={person} count={count} />,
      label: "Дашборд",
      icon: dashboardIcon,
      visible: true,
    },
    {
      path: "/",
      element: <AutoFarm setNumPage={setNumPage} person={person} />,
      label: "Auto Farm",
      icon: autofarmIcon,
      visible: true,
    },
    {
      path: "/",
      element: <Lottery person={person} />,
      label: "Лотерея",
      icon: lotteryIcon,
      visible: true,
    },
    {
      path: "/",
      element: null,
      label: "Games",
      icon: gamesIcon,
      visible: true,
    }
  ];

  const routesVisibleElemCount = routes.filter((route) => route.visible).length
  const activeNavElemWidth = 100 / routesVisibleElemCount;

  const auth = async () => {
    const response = await getPerson({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username})
    //const response = await getPerson({tid: "358929635", username: "Fourpro"})

    if(response.error){
      console.log(response.error)
    }else{
      setPerson({tid: response.tid, username: response.username, status: response.status, bonuses: response.bonuses, myCoins: response.my_coins, autoCoins: response.auto_coins, Notcoin: response.Notcoin, Pepe: response.Pepe, Shiba: response.Shiba, Dogecoin: response.Dogecoin, Dogwifhat: response.Dogwifhat, Popcat: response.Popcat, Mog: response.Mog, Floki: response.Floki, Ponke: response.Ponke, Mew: response.Mew, Bome: response.Bome, autoclick: response.autoclick, status_autoclick: response.status_autoclick, status_unlimit: response.status_unlimit, status_boost: response.status_boost, level: response.level, timer: response.timer, lang: response.lang})
      setCount(response.my_coins + response.auto_coins)
      setAllSteps(response.my_coins_max)
      setLevel(response.level)
    }
    //setLoad(false)
    setTimeout(() => { setLoad(false); }, 2000);
  };

  const auth2 = async () => {
    const response = await getPerson({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username})
    //const response = await getPerson({tid: "358929635", username: "Fourpro"})

    if(response.error){
      console.log(response.error)
    }else{
      setPerson({tid: response.tid, username: response.username, status: response.status, bonuses: response.bonuses, myCoins: response.my_coins, autoCoins: response.auto_coins, Notcoin: response.Notcoin, Pepe: response.Pepe, Shiba: response.Shiba, Dogecoin: response.Dogecoin, Dogwifhat: response.Dogwifhat, Popcat: response.Popcat, Mog: response.Mog, Floki: response.Floki, Ponke: response.Ponke, Mew: response.Mew, Bome: response.Bome, autoclick: response.autoclick, status_autoclick: response.status_autoclick, status_unlimit: response.status_unlimit, status_boost: response.status_boost, level: response.level, timer: response.timer, lang: response.lang})
      setLevel(response.level)
    }
  };

  const setCoins = async () => {
    //if(allSteps > 0){
      const response = await setMyCoins({tid: tg.initDataUnsafe?.user?.id, amount: touchCoins, max_amount: allSteps, coins: otherCoins})
      if(response.error){
        console.log(response.error)
      }else{
        setCount(response.my_coins + response.auto_coins)
        setAllSteps(response.my_coins_max)
        setTouchCoins(0)
        setOtherCoins({
          Notcoin: 0,
          Pepe: 0,
          Shiba: 0,
          Dogecoin: 0,
          Dogwifhat: 0,
          Popcat: 0,
          Mog: 0,
          Floki: 0,
          Ponke: 0,
          Mew: 0,
          Bome: 0
        })
      }
    //}
  };

  const getStepss = async () => {
    const response = await getSteps()
    if(response.error){
      console.log(response.error)
    }else{
      setStep(response.step);
      setNotcoin_step(response.notcoin_step);
      setPepe_step(response.pepe_step);
      setShiba_step(response.shiba_step);
      setDogecoin_step(response.dogecoin_step);
      setDogwifhat_step(response.dogwifhat_step);
      setPopcat_step(response.popcat_step);
      setMog_step(response.mog_step);
      setFloki_step(response.floki_step);
      setPonke_step(response.ponke_step);
      setMew_step(response.mew_step);
      setBome_step(response.bome_step);
    }
  };

  useEffect(() => {
    tg.ready()
    tg.enableClosingConfirmation()
    auth()
    getStepss()
    getLng()
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      auth2()
      setCoins()
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
    {"358929635" != "undefined" ?
      <>
      {load || loading ?
        <div style={{backgroundImage: `url(${bgImages[level]})`}} className={`h-full bg-cover overflow-hidden relative`}><Loading /></div>
      :
      <>
      {person != null ?
        <TonConnectUIProvider manifestUrl='https://hammerhead-app-lqwus.ondigitalocean.app/tonconnect-manifest.json'>
          {numPage == 5 ?
          <>
            <div style={{backgroundImage: `url(${bgImages[level]})`}} className={`h-full bg-cover overflow-hidden relative`}><ConnectWallet person={person} />
              <div className="absolute bottom-[10px] left-[17px] right-[17px]">
                <nav className="bg-bgColorGreen backdrop-blur-xl h-[76px] rounded-[15px] w-full relative">
                  <div
                    style={{ width: `${activeNavElemWidth}%` , left: `${0}%` }}
                    className=" absolute h-full z-0 p-[4px] transition-all"
                  >
                    <div className="elem-bg_green h-full w-full rounded-[12px]"></div>
                  </div>
                  <ul className="flex flex-row justify-between gap-[2px] h-full">
                    {routes.map((link, i) => {
                      return (
                        link.visible && (
                          <button
                            key={i}
                            className={
                              "font-comic text-gradient text-sm flex-1 flex flex-col items-center justify-end gap-[4px] z-10 mb-[8px]"
                            }
                            onClick={() => setNumPage(i)}
                          >
                            <>
                              <img src={link.icon} alt="" />
                              <span className='whitespace-nowrap'>{link.label}</span>
                            </>
                          </button>
                        )
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </>
          :
          <>
          {numPage == 6 ?
            <div style={{backgroundImage: `url(${bgImages[level]})`}} className={`h-full bg-cover overflow-hidden relative`}><Guide /></div>
          :
          <>
            <div style={{backgroundImage: `url(${bgImages[level]})`}} className={`h-full bg-cover overflow-hidden relative`}>{routes[numPage].element}
              <div className="absolute bottom-[10px] left-[17px] right-[17px]">
                <nav className="bg-bgColorGreen backdrop-blur-xl h-[76px] rounded-[15px] w-full relative">
                  <div
                    style={{ width: `${activeNavElemWidth}%` , left: `${numPage > (routesVisibleElemCount - 1) ? 0 : numPage  * activeNavElemWidth}%` }}
                    className=" absolute h-full z-0 p-[4px] transition-all"
                  >
                    <div className="elem-bg_green h-full w-full rounded-[12px]"></div>
                  </div>
                  <ul className="flex flex-row justify-between gap-[2px] h-full">
                    {routes.map((link, i) => {
                      return (
                        link.visible && (
                          <button
                            key={i}
                            className={
                              "font-comic text-gradient text-sm flex-1 flex flex-col items-center justify-end gap-[4px] z-10 mb-[8px]"
                            }
                            onClick={() => setNumPage(i)}
                          >
                            <>
                              <img src={link.icon} alt="" />
                              <span className='whitespace-nowrap'>{link.label}</span>
                            </>
                          </button>
                        )
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </>
          }
          </>
          }
        </TonConnectUIProvider>
      :
      <div style={{backgroundImage: `url(${bgImages[level]})`}} className={`h-full bg-cover overflow-hidden relative`}><Guide /></div>
      }
      </>
      }
      </>
      :
      <div className="bg-bgMain h-full bg-cover overflow-hidden"><a className='text-white' href="https://t.me/mamontenokBot_bot/Mamontenok">View app in telegram</a></div>
    }
    </>
  )
}

export default App
