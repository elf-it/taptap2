import './App.css';
import Guide from './pages/Guide';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Lottery from './pages/Lottery';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import AutoFarm from './pages/AutoFarm';
import ConnectWallet from './pages/ConnectWallet';
import { getPerson } from './lib/fetch';
import { Icon } from './component/IconSprite';
import { NavLink } from 'react-router-dom';

const tg = window.Telegram.WebApp;

function App() {

  const [numPage, setNumPage] = useState(0);

  const [person, setPerson] = useState(null);

  const [load, setLoad] = useState(true);

  const routes = [
    {
      path: "/",
      element: <Main setNumPage={setNumPage} />,
      label: "Games",
      icon: "mamoth"
    },
    {
      path: "/",
      element: <Dashboard />,
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
    if(response.error){
      console.log(response.error)
    }else{
      setPerson({tid: response.tid, username: response.username})
      console.log(person)
    }
    setLoad(false)
  };

  useEffect(() => {
    tg.ready()
    auth()
  }, []);

  return (
    <>
    {"399847443" != "undefined" ?
      <>
      {load ?
        <div className="bg-bgMain h-full bg-cover overflow-hidden"><span className='text-white'>Loading...</span></div>
      :
      <>
      { person != null ?
        <TonConnectUIProvider manifestUrl='https://hammerhead-app-lqwus.ondigitalocean.app/tonconnect-manifest.json'>

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

          {/*<div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs'>
            <div className='text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl' onClick={() => setNumPage(1)}>
              <Mine className='w-8 h-8 mx-auto' />
              <p className='mt-1'>Main</p>
            </div>
            <div className='text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl' onClick={() => setNumPage(2)}>
              <Friends className='w-8 h-8 mx-auto' />
              <p className='mt-1'>Dasboard</p>
            </div>
            <div className='text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl' onClick={() => setNumPage(3)}>
              <img src={binanceLogo} alt='Exchange' className='w-8 h-8 mx-auto' />
              <p className='mt-1'>Autofarm</p>
            </div>
            <div className='text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl' onClick={() => setNumPage(4)}>
              <Coins className='w-8 h-8 mx-auto' />
              <p className='mt-1'>Connect</p>
            </div>
            <div className='text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl' onClick={() => setNumPage(5)}>
              <Coins className='w-8 h-8 mx-auto' />
              <p className='mt-1'>Data</p>
            </div>
          </div>*/}
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
