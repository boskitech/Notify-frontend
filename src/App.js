import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import Chat from './components/Chat';
import Login from './views/Login';
import StartChat from './components/StartChat';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
            <Route path="/chat" element={<Home />}>
              <Route path="/chat" element={<StartChat />} />
              <Route path="/chat/:id" element={<Chat />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
