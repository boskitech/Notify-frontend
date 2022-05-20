import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from './views/Home';
import Chat from './components/Chat';
import StartChat from './components/StartChat';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="/" element={<Home />}>
              <Route path="/" element={<StartChat />} />
              <Route path="/:id" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);