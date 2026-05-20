import React, { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/estadisticas")
      .then((r) => r.json())
      .then(setStats)
      .catch(() =>
        setStats({
          usuarios: "12,000+",
          idiomas: 8,
          descargas: "50,000+",
          calificacion: 4.8,
        })
      );
  }, []);

  if (!stats) return null;

  const items = [
    { numero: stats.usuarios,     label: "Usuarios activos" },
    { numero: stats.idiomas,      label: "Idiomas soportados" },
    { numero: stats.descargas,    label: "Descargas totales" },
    { numero: `${stats.calificacion}★`, label: "Calificación promedio" },
  ];

  return (
    <section className="stats">
      <div className="stats__grid">
        {items.map((item, i) => (
          <div className="stats__item" key={i}>
            <div className="stats__numero">{item.numero}</div>
            <div className="stats__label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
