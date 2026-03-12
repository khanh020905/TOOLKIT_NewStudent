import React from "react";
import Hero from "../components/sections/Hero";
import QuizCTA from "../components/sections/QuizCTA";
import Features from "../components/sections/Features";

function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Hero />
      <QuizCTA />
      <Features />
    </div>
  );
}

export default Home;
