import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import LeDonna from './LeDonna.tsx';
import LanguageRedirect from './components/LanguageRedirect.tsx';
import LanguageLayout from './components/LanguageLayout.tsx';
import './index.css';

const BlogList = lazy(() => import('./pages/BlogList.tsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'));

const BlogFallback = (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<App />} />
          <Route path="ledonna" element={<LeDonna />} />
          <Route path="blog" element={<Suspense fallback={BlogFallback}><BlogList /></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={BlogFallback}><BlogPost /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
