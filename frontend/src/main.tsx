import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import LobbyPage from './pages/LobbyPage.tsx';
import RolePage from './pages/RolePage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spy" element={<RolePage />} />
        <Route path="/role" element={<RolePage />} />
        <Route path="/:lobbyId" element={<LobbyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
