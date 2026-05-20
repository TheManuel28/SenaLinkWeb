import React from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Funcionalidades from "./components/Funcionalidades.jsx";
import Testimonios from "./components/Testimonios.jsx";
import Contacto from "./components/Contacto.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Stats />
      <Funcionalidades />
      <Testimonios />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;

