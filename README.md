# OpenCode Web Cloud 🚀

Una versión web e interactiva de OpenCode que corre 100% en el navegador sin necesidad de instalar nada en tu computadora local. Alojado en Vercel y potenciado por la comunidad Open Source.

## 🔒 Sistema de Seguridad y API Keys
Para garantizar un entorno seguro y evitar el robo de credenciales:
- **Autenticación Obligatoria:** Es obligatorio iniciar sesión con **Google, GitHub o Discord** antes de interactuar con la plataforma.
- **Validación de Identidad:** Las API Keys (OpenAI, Gemini, Claude, Groq, etc.) se cifran y guardan asociadas estrictamente al ID único de tu usuario.
- **Protección Anti-Robo:** El backend valida en cada petición que la API Key pertenezca al usuario autenticado. Si el sistema detecta un intento de uso por parte de otra cuenta, el acceso se bloquea inmediatamente.

## 🛠️ Tecnologías del Proyecto
- **Frontend:** Next.js / React (Desplegado en Vercel)
- **Base de Datos:** MongoDB / PostgreSQL (Independiente de Supabase/Firebase)
- **Autenticación:** Auth.js (NextAuth)
- **Motor de Ejecución:** WebAssembly (Pyodide) / Sandboxes en la nube
