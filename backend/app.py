from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message # type: ignore
import os
app = Flask(__name__)
CORS(app)

# ── Configuración de correo ──────────────────────────────────────────────────
app.config['MAIL_SERVER']   = 'smtp.gmail.com'
app.config['MAIL_PORT']     = 587
app.config['MAIL_USE_TLS']  = True
app.config['MAIL_USERNAME'] = 'carloscabrerapatazca@gmail.com'
app.config['MAIL_PASSWORD'] = 'twpf mand pcao byvo'
app.config['MAIL_DEFAULT_SENDER'] = 'carloscabrerapatazca@gmail.com'

mail = Mail(app)

# ── Datos ────────────────────────────────────────────────────────────────────

FUNCIONALIDADES = [
    {"id": 1, "titulo": "Traducción inteligente",       "descripcion": "Convierte voz a texto y texto a voz en tiempo real con IA.",                       "icono": "🎙️"},
    {"id": 2, "titulo": "Botón de emergencia",          "descripcion": "Envía tu ubicación GPS a contactos de confianza con un solo toque.",                "icono": "🚨"},
    {"id": 3, "titulo": "Cámara con traducción en vivo","descripcion": "Reconoce lengua de señas con la cámara del dispositivo.",                           "icono": "📷"},
    {"id": 4, "titulo": "Tablero de pictogramas",       "descripcion": "Pictogramas personalizables para comunicación aumentativa.",                        "icono": "🖼️"},
    {"id": 5, "titulo": "Modo offline",                 "descripcion": "Las funciones básicas funcionan sin conexión a internet.",                          "icono": "📶"},
    {"id": 6, "titulo": "Perfil personalizable",        "descripcion": "Adapta la interfaz al nivel de necesidad comunicativa del usuario.",                 "icono": "⚙️"},
]

ESTADISTICAS = {"usuarios": "12,000+", "idiomas": 8, "descargas": "50,000+", "calificacion": 4.8}

TESTIMONIOS = [
    {"nombre": "María G.",   "texto": "SeñaLink cambió mi vida. Por fin puedo comunicarme con mi familia sin barreras.",         "rol": "Usuaria con discapacidad auditiva"},
    {"nombre": "Carlos R.",  "texto": "Como terapeuta del lenguaje, recomiendo esta app a todos mis pacientes.",                  "rol": "Terapeuta del lenguaje"},
    {"nombre": "Sofía M.",   "texto": "El tablero de pictogramas es increíble. Mi hijo lo usa todos los días.",                  "rol": "Mamá de niño con TEA"},
]

# ── Rutas ────────────────────────────────────────────────────────────────────

@app.route("/api/funcionalidades")
def get_funcionalidades():
    return jsonify(FUNCIONALIDADES)

@app.route("/api/estadisticas")
def get_estadisticas():
    return jsonify(ESTADISTICAS)

@app.route("/api/testimonios")
def get_testimonios():
    return jsonify(TESTIMONIOS)

@app.route("/api/contacto", methods=["POST"])
def contacto():
    data    = request.get_json()
    nombre  = data.get("nombre",  "").strip()
    email   = data.get("email",   "").strip()
    mensaje = data.get("mensaje", "").strip()

    if not nombre or not email or not mensaje:
        return jsonify({"error": "Todos los campos son requeridos."}), 400

    try:
        msg = Message(
            subject=f"[SeñaLink] Nuevo mensaje de {nombre}",
            recipients=["carloscabrerapatazca@gmail.com"],
            body=f"""
Nuevo mensaje recibido desde el formulario de SeñaLink AI:

Nombre:  {nombre}
Correo:  {email}
Mensaje:
{mensaje}
            """.strip()
        )
        mail.send(msg)
        return jsonify({"ok": True, "mensaje": "¡Mensaje enviado! Te responderemos pronto."})
    except Exception as e:
        print(f"[ERROR correo] {e}")
        return jsonify({"error": "No se pudo enviar el correo. Intenta más tarde."}), 500

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

# ── Inicio ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, port=port, host='0.0.0.0')
