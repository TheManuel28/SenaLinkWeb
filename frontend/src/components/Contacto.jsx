import React, { useState } from "react";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [respuesta, setRespuesta] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setRespuesta(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setRespuesta({ ok: true, texto: data.mensaje });
        setForm({ nombre: "", email: "", mensaje: "" });
      } else {
        setRespuesta({ ok: false, texto: data.error || "Error al enviar." });
      }
    } catch {
      setRespuesta({ ok: false, texto: "No se pudo conectar con el servidor." });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contacto" className="contacto">
      <div className="section__header">
        <p className="section__eyebrow">¿Tienes preguntas?</p>
        <h2 className="section__titulo">Contáctanos</h2>
        <p className="section__subtitulo">
          Escríbenos y te responderemos a la brevedad.
        </p>
      </div>

      <div className="contacto__inner">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__grupo">
            <label className="form__label" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className="form__input"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__grupo">
            <label className="form__label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form__input"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__grupo">
            <label className="form__label" htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="form__textarea"
              placeholder="¿En qué podemos ayudarte?"
              value={form.mensaje}
              onChange={handleChange}
              required
            />
          </div>

          {respuesta && (
            <p className={`form__mensaje form__mensaje--${respuesta.ok ? "ok" : "error"}`}>
              {respuesta.texto}
            </p>
          )}

          <button
            type="submit"
            className="btn-primario form__submit"
            disabled={enviando}
          >
            {enviando ? "Enviando…" : "Enviar mensaje ✉️"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
