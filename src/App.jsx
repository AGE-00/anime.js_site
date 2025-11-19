import { useState, useEffect } from 'react';
import './App.css';
import BackgroundCanvas from './components/BackgroundCanvas.jsx';
import AnimatedTitle from './components/AnimatedTitle.jsx';
import Header from './components/Header.jsx';

import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Playground from './components/Playground.jsx';
import Gallery from './components/Gallery.jsx';
import ScrollDemo from './components/ScrollDemo.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <BackgroundCanvas />
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero>
          <AnimatedTitle text="All-in-one animation engine." />
          <p className="hero-tagline">A fast and versatile JavaScript library to animate the web.</p>
          <button className="cta-button">Learn more</button>
        </Hero>
        <Features />
        <Playground />
        <Gallery />
        <ScrollDemo />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
