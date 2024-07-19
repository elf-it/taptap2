import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guide from './pages/Guide';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl='https://hammerhead-app-lqwus.ondigitalocean.app/tonconnect-manifest.json'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="bg-bgMain h-full bg-cover overflow-hidden"><Guide /></div>} />
          <Route path="main" element={<div className="bg-bgMain h-full bg-cover overflow-hidden"><Main /></div>} />
          <Route path="dashboard" element={<div className="bg-bgMain h-full bg-cover overflow-hidden"><Dashboard /></div>} />
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  )
}

export default App
