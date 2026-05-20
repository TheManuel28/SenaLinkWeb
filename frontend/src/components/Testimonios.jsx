import React, { useEffect, useState } from "react";

const Testimonios = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/testimonios")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <section id="testimonios" className="testimonios">
      <div className="section__header">
        <p className="section__eyebrow">Lo que dicen los usuarios</p>
        <h2 className="section__titulo">Historias reales</h2>
        <p className="section__subtitulo">
          Miles de personas ya mejoran su comunicación con SeñaLink.
        </p>
      </div>

      <div className="test__grid">
        {items.map((t, i) => (
          <div className="test__card" key={i}>
            <div className="test__comilla">"</div>
            <p className="test__texto">{t.texto}</p>
            <div className="test__autor">
              <span className="test__nombre">{t.nombre}</span>
              <span className="test__rol">{t.rol}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonios;
