import { useState } from "react";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import SourceCode from "./components/SourceCode";
import Installation from "./components/Installation";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  const [activeCodeTab, setActiveCodeTab] = useState("manifest.json");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white antialiased">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Demo />
      <Features />
      <SourceCode activeTab={activeCodeTab} setActiveTab={setActiveCodeTab} />
      <Installation />
      <FAQ />
      <Footer />
    </div>
  );
}
