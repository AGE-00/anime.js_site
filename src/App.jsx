import './App.css';
import BackgroundCanvas from './components/BackgroundCanvas.jsx';
import AnimatedTitle from './components/AnimatedTitle.jsx';
import Header from './components/Header.jsx';

import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

function App() {
  return (
    <>
      <BackgroundCanvas />
      <Header />
      <main>
        <Hero>
          <AnimatedTitle text="All-in-one animation engine." />
          <p className="hero-tagline">A fast and versatile JavaScript library to animate the web.</p>
          <button className="cta-button">Learn more</button>
        </Hero>
        <Features />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
