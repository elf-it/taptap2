import './App.css';
import Guide from './pages/Guide';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useState } from 'react';
import Friends from './icons/Friends';
import Mine from './icons/Mine';
import Coins from './icons/Coins';
import { binanceLogo } from './images';
import AutoFarm from './pages/AutoFarm';
import ConnectWallet from './pages/ConnectWallet';

const tg = window.Telegram.WebApp;

function App() {

  const [numPage, setNumPage] = useState(1);

  const pages = [
    <Guide />,
    <Main />,
    <Dashboard />,
    <AutoFarm />,
    <ConnectWallet />
  ];

  return (
    <>
    {tg.initDataUnsafe?.user?.username != "" ?
      <p>{tg.initDataUnsafe?.user}</p>
      {/*
      <TonConnectUIProvider manifestUrl='https://hammerhead-app-lqwus.ondigitalocean.app/tonconnect-manifest.json'>

        <div className="bg-bgMain h-full bg-cover overflow-hidden">{pages[numPage]}</div>

        <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs'>
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
        </div>
      </TonConnectUIProvider>
      */}
      :
      <div className="bg-bgMain h-full bg-cover overflow-hidden"><Guide /></div>
    }
    </>
  )
}

export default App
