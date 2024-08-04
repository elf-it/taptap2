import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LevelContext from "./store/levelContext";
import LangContext from './store/langContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LevelContext>
      <LangContext>
        <App />
      </LangContext>
    </LevelContext>
  </React.StrictMode>
);
