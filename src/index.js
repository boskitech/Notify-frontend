import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Home from './views/Home';
import Chat from './components/Chat';
import Login from './views/Login';
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
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/chat" element={<Home />}>
              <Route path="/chat" element={<StartChat />} />
              <Route path="/chat/:id" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);