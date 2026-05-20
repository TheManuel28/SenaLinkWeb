import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__brand">
        <img src="/logo.png" alt="SeñaLink AI" className="header__logo-img" />
        <div className="header__logo">
          Señ<span>a</span>Link <span>AI</span>
        </div>
      </div>

      {/* Hamburguesa solo en móvil */}
      <button
        className="header__hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
      </button>

      <nav className={`header__nav${open ? ' open' : ''}`}>
        <a href="#inicio"          onClick={() => setOpen(false)}>Inicio</a>
        <a href="#funcionalidades" onClick={() => setOpen(false)}>Funciones</a>
        <a href="#testimonios"     onClick={() => setOpen(false)}>Testimonios</a>
        <a href="#contacto"        onClick={() => setOpen(false)}>Contacto</a>
        <a
          href="https://play.google.com/store/apps/details?id=tu.app.id"
          className="header__cta"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Descargar app
        </a>
      </nav>
    </header>
  );
};

export default Header;
