import os
import resend
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

resend.api_key = os.environ.get("RESEND_API_KEY")

# ── Datos ────────────────────────────────────────────────────────────────────

FUNCIONALIDADES = [
    {"id": 1, "titulo": "Traducción inteligente",        "descripcion": "Convierte voz a texto y texto a voz en tiempo real con IA.",                "icono": "🎙️"},
    {"id": 2, "titulo": "Botón de emergencia",           "descripcion": "Envía tu ubicación GPS a contactos de confianza con un solo toque.",       "icono": "🚨"},
    {"id": 3, "titulo": "Cámara con traducción en vivo", "descripcion": "Reconoce lengua de señas con la cámara del dispositivo.",                  "icono": "📷"},
    {"id": 4, "titulo": "Tablero de pictogramas",        "descripcion": "Pictogramas personalizables para comunicación aumentativa.",               "icono": "🖼️"},
    {"id": 5, "titulo": "Modo offline",                  "descripcion": "Las funciones básicas funcionan sin conexión a internet.",                 "icono": "📶"},
    {"id": 6, "titulo": "Perfil personalizable",         "descripcion": "Adapta la interfaz al nivel de necesidad comunicativa del usuario.",        "icono": "⚙️"},
]

ESTADISTICAS = {"usuarios": "12,000+", "idiomas": 8, "descargas": "50,000+", "calificacion": 4.8}

TESTIMONIOS = [
    {"nombre": "María G.",  "texto": "SeñaLink cambió mi vida. Por fin puedo comunicarme con mi familia sin barreras.",  "rol": "Usuaria con discapacidad auditiva"},
    {"nombre": "Carlos R.", "texto": "Como terapeuta del lenguaje, recomiendo esta app a todos mis pacientes.",           "rol": "Terapeuta del lenguaje"},
    {"nombre": "Sofía M.",  "texto": "El tablero de pictogramas es increíble. Mi hijo lo usa todos los días.",           "rol": "Mamá de niño con TEA"},
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
        params = {
            "from": "SeñaLink AI <onboarding@resend.dev>",
            "to": ["carlosmanuelcabrerapatazca@gmail.com"],
            "subject": f"[SeñaLink] Nuevo mensaje de {nombre}",
            "html": f"""
                <h2>Nuevo mensaje desde SeñaLink AI</h2>
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>{mensaje}</p>
            """
        }
        resend.Emails.send(params)
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

