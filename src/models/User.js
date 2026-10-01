import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // ID único que viene del login social (Discord/Google/GitHub)
  providerId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  
  // Aquí se guardan las API keys encriptadas (texto borroso/ilegible)
  apiKeys: {
    gemini: { type: String, default: null },
    openai: { type: String, default: null },
    claude: { type: String, default: null },
    groq: { type: String, default: null }
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
