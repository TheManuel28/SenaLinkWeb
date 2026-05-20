import React from "react";

const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      <img src="/logo.png" alt="SeñaLink AI" className="footer__logo-img" />
      <div className="footer__logo">
        Señ<span>a</span>Link <span>AI</span>
      </div>
    </div>
    <p>© 2026 SeñaLink AI — Todos los derechos reservados</p>
    <a
      href="https://play.google.com/store/apps/details?id=tu.app.id"
      className="footer__link"
      target="_blank"
      rel="noreferrer"
    >
      Descargar en Play Store →
    </a>
  </footer>
);

export default Footer;