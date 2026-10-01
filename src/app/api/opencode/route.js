import { auth } from "@/auth";
import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import { decrypt } from "@/src/lib/crypto";

export async function POST(req) {
  // 1. Validar si el usuario está logueado en el navegador
  const session = await auth();
  if (!session) {
    return Response.json({ error: "No autorizado. Debes iniciar sesión obligatoriamente." }, { status: 401 });
  }

  await connectDB();

  // 2. Buscar al usuario en la base de datos web usando su cuenta social
  const user = await User.findOne({ providerId: session.user.id });
  if (!user) {
    return Response.json({ error: "Usuario no registrado en el sistema de seguridad." }, { status: 403 });
  }

  // 3. Extraer de manera segura la API key correspondiente (Ejemplo con Gemini)
  const { provider } = await req.json(); // 'gemini', 'openai', etc.
  const encryptedKey = user.apiKeys[provider];

  if (!encryptedKey) {
    return Response.json({ error: `No tienes una API Key configurada para ${provider}` }, { status: 400 });
  }

  // 4. Desencriptar la clave en memoria solo por un instante para hacer la consulta
  const realApiKey = decrypt(encryptedKey);

  // Aquí el backend hace la petición al modelo (Gemini, Groq, etc.) de forma invisible.
  // El usuario en el navegador NUNCA ve la API key real pasar por la red.
  
  return Response.json({ success: true, message: "Petición procesada de forma segura." });
}
