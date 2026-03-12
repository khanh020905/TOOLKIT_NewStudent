import React from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      
      {/* Decorative footer spacer / CTA section area for later */}
      <div className="h-24 md:h-32"></div>
    </div>
  )
}

export default Home;
