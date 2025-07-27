import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AnnouncementProvider } from './context/Announcement-context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AnnouncementProvider>

    <App />
     </AnnouncementProvider>
  </StrictMode>,
)
