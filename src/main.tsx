import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import LeDonna from './LeDonna.tsx';
import LanguageRedirect from './components/LanguageRedirect.tsx';
import LanguageLayout from './components/LanguageLayout.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<App />} />
          <Route path="ledonna" element={<LeDonna />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
