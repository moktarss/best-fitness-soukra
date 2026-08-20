import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import { Header, Footer } from './components/Layout.jsx';
import { WhatsAppFab } from './components/WhatsApp.jsx';
import Home from './pages/Home.jsx';
import { Services, Programs, Team, Blog, Pricing, About, Contact, NotFound } from './pages/Inner.jsx';

/* Remonte en haut à chaque changement de page */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    /* reducedMotion="user" : framer-motion respecte prefers-reduced-motion */
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/program" element={<Programs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  );
}
