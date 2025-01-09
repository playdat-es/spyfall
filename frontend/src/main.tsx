import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import LobbyPage from './pages/LobbyPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
    <LobbyPage />
  </StrictMode>,
)
