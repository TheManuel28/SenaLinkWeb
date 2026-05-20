import React from "react";

const Hero = () => (
  <section id="inicio" className="hero">
    <div className="hero__dots" />

    <div className="hero__texto">
      <div className="hero__badge">
        <span>🤝</span> Tecnología para la inclusión
      </div>
      <h1 className="hero__titulo">
        Comunicación sin
        <br />
        <span className="acento">fronteras</span>
      </h1>
      <p className="hero__subtitulo">
        SeñaLink AI conecta a personas con discapacidad auditiva y del habla
        con el mundo, usando inteligencia artificial en tiempo real.
      </p>
      <div className="hero__botones">
        <a
          href="https://play.google.com/store/apps/details?id=tu.app.id"
          className="btn-primario"
          target="_blank"
          rel="noreferrer"
        >
          📲 Descargar gratis
        </a>
        <a href="#funcionalidades" className="btn-secundario">
          Conocer más →
        </a>
      </div>
    </div>

    <div className="hero__imagen">
      <img src="/logo.png" alt="SeñaLink AI" className="hero__logo-grande" />
    </div>
  </section>
);

export default Hero;


