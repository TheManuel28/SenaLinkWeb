import React, { useEffect, useState } from "react";

const Funcionalidades = () => {
  const [funcs, setFuncs] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/funcionalidades`)
      .then((r) => r.json())
      .then((data) => { setFuncs(data); setCargando(false); })
      .catch(() => setCargando(false));
  }, []);

  return (
    <section id="funcionalidades" className="funcionalidades">
      <div className="section__header">
        <p className="section__eyebrow">¿Qué puedes hacer?</p>
        <h2 className="section__titulo">Funcionalidades principales</h2>
        <p className="section__subtitulo">
          Herramientas diseñadas para eliminar barreras y conectar personas.
        </p>
      </div>

      <div className="funcs__grid">
        {cargando && (
          <p className="funcs__cargando">Cargando funcionalidades…</p>
        )}
        {funcs.map((f) => (
          <div className="func__card" key={f.id}>
            <span className="func__icono">{f.icono}</span>
            <h3 className="func__titulo">{f.titulo}</h3>
            <p className="func__desc">{f.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Funcionalidades;

