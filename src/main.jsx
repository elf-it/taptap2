import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LevelContext from "./store/levelContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LevelContext>
      <App />
    </LevelContext>
  </React.StrictMode>
);
