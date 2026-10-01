import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Clave secreta privada en Vercel
const IV_LENGTH = 16; 

// Función para cifrar la API key antes de guardarla en la web gratis
export function encrypt(text) {
  if (!text) return null;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, "hex"), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// Función para descifrarla SOLO cuando el usuario verificado use la app
export function decrypt(text) {
  if (!text) return null;
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, "hex"), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
