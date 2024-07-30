import './App.css';
import Guide from './pages/Guide';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Lottery from './pages/Lottery';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import AutoFarm from './pages/AutoFarm';
import ConnectWallet from './pages/ConnectWallet';
import { getPerson, setMyCoins } from './lib/fetch';
import { Icon } from './component/IconSprite';
import Loading from './pages/Loading';

const tg = window.Telegram.WebApp;

function App() {

  const [numPage, setNumPage] = useState(0);

  const [person, setPerson] = useState(null);

  const [load, setLoad] = useState(true);

  const [touchCoins, setTouchCoins] = useState(0)
  const [allSteps, setAllSteps] = useState(0)
  const [count, setCount] = useState(0)

  const step = 10;

  const addStep = () => {
    setTouchCoins(touchCoins + step);
    setCount(count + step);
    setAllSteps(allSteps - step);
  }

  const routes = [
    {
      path: "/",
      element: <Main setNumPage={setNumPage} person={person} addStep={addStep} count={count} allSteps={allSteps} />,
      label: "Games",
      icon: "mamoth"
    },
    {
      path: "/",
      element: <Dashboard person={person} count={count} />,
      label: "Дашборд",
      icon:"dashboard"
    },
    {
      path: "/",
      element: <AutoFarm setNumPage={setNumPage} />,
      label: "Auto Farm",
      icon:"autofarm"
    },
    {
      path: "/",
      element: <Lottery />,
      label: "Лотерея",
      icon: "lottery",
    },
  ];

  const auth = async () => {
    const response = await getPerson({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username})
    //const response = await getPerson({tid: "358929635", username: "Fourpro"})

    if(response.error){
      console.log(response.error)
    }else{
      setPerson({tid: response.tid, username: response.username, status: response.status, bonuses: response.bonuses, myCoins: response.my_coins, autoCoins: response.auto_coins})
      setCount(response.my_coins + response.auto_coins)
      setAllSteps(response.my_coins_max)
    }
    setLoad(false)
  };

  const auth2 = async () => {
    const response = await getPerson({tid: tg.initDataUnsafe?.user?.id, username: tg.initDataUnsafe?.user?.username})
    //const response = await getPerson({tid: "358929635", username: "Fourpro"})

    if(response.error){
      console.log(response.error)
    }else{
      setPerson({tid: response.tid, username: response.username, status: response.status, bonuses: response.bonuses, myCoins: response.my_coins, autoCoins: response.auto_coins})
    }
    setLoad(false)
  };

  const setCoins = async () => {
    const response = await setMyCoins({tid: tg.initDataUnsafe?.user?.id, amount: touchCoins, max_amount: allSteps})
    if(response.error){
      console.log(response.error)
    }else{
      setCount(response.my_coins + response.auto_coins)
      setAllSteps(response.my_coins_max)
      setTouchCoins(0)
    }
  };

  useEffect(() => {
    tg.ready()
    tg.enableClosingConfirmation()
    auth()
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
      {load ?
        <div className="bg-bgMain h-full bg-cover overflow-hidden"><Loading /></div>
      :
      <>
      { person != null ?
        <TonConnectUIProvider manifestUrl='https://hammerhead-app-lqwus.ondigitalocean.app/tonconnect-manifest.json'>

          {numPage == 4 ?
          <>
            <div className="bg-bgMain h-full bg-cover overflow-hidden"><ConnectWallet person={person} /></div>
            <div className="absolute bottom-[10px] left-[17px] right-[17px]">
              <nav className="bg-bgColorGreen backdrop-blur-xl h-[76px] rounded-[15px] w-full relative">
                <div
                  style={{ width: "25%", left: `${0 * 25}%` }}
                  className=" absolute h-full z-0 p-[4px] transition-all"
                >
                  <div className="elem-bg_green h-full w-full rounded-[12px]"></div>
                </div>
                <ul className="flex flex-row justify-between gap-[2px] h-full">
                  {routes.map((link, i) => (
                    <button
                      key={i}
                      className={
                        "font-comic text-gradient text-sm flex-1 flex flex-col items-center justify-end gap-[4px] z-10 mb-[8px]"
                      }
                      onClick={() => setNumPage(i)}
                    >
                      <Icon
                          styles={{ opacity: link.icon === "mamoth" ? 1 : 0.3 }}
                          name={link.icon}
                          size={link.icon === "mamoth" ? 38 : 24}
                          color={true ? "#79F2CE" : "#fff"}
                        />
                        {link.label}
                    </button>
                  ))}
                </ul>
              </nav>
            </div>
          </>
          :
          <>
          {numPage == 5 ?
            <div className="bg-bgMain h-full bg-cover overflow-hidden">{tg.initDataUnsafe?.start_param}</div>
          :
          <>
            <div className="bg-bgMain h-full bg-cover overflow-hidden">{routes[numPage].element}</div>
            <div className="absolute bottom-[10px] left-[17px] right-[17px]">
              <nav className="bg-bgColorGreen backdrop-blur-xl h-[76px] rounded-[15px] w-full relative">
                <div
                  style={{ width: "25%", left: `${numPage * 25}%` }}
                  className=" absolute h-full z-0 p-[4px] transition-all"
                >
                  <div className="elem-bg_green h-full w-full rounded-[12px]"></div>
                </div>
                <ul className="flex flex-row justify-between gap-[2px] h-full">
                  {routes.map((link, i) => (
                    <button
                      key={i}
                      className={
                        "font-comic text-gradient text-sm flex-1 flex flex-col items-center justify-end gap-[4px] z-10 mb-[8px]"
                      }
                      onClick={() => setNumPage(i)}
                    >
                      <Icon
                          styles={{ opacity: link.icon === "mamoth" ? 1 : 0.3 }}
                          name={link.icon}
                          size={link.icon === "mamoth" ? 38 : 24}
                          color={true ? "#79F2CE" : "#fff"}
                        />
                        {link.label}
                    </button>
                  ))}
                </ul>
              </nav>
            </div>
          </>
          }
          </>
          }
        </TonConnectUIProvider>
      :
        <div className="bg-bgMain h-full bg-cover overflow-hidden"><Guide /></div>
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
