"use client";
import { useState } from "react";

export default function ConfigPage() {
  const [provider, setProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Guardando y cifrando de forma segura...");

    const res = await fetch("/api/opencode/save-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, apiKey }),
    });

    if (res.ok) {
      setStatus("¡Llave guardada con éxito! Está amarrada a tu ID y nadie podrá usarla.");
      setApiKey("");
    } else {
      const data = await res.json();
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <a href="/" style={{ textDecoration: "none", color: "#0070f3", fontWeight: "bold" }}>← Volver al Panel</a>
      
      <h1 style={{ marginTop: "20px" }}>🔒 Configurar tus API Keys</h1>
      <p style={{ color: "#666" }}>Tus credenciales se encriptan inmediatamente en nuestro servidor seguro.</p>
      
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Proveedor de IA:</label>
        <select 
          value={provider} 
          onChange={(e) => setProvider(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="gemini">Google Gemini</option>
          <option value="openai">ChatGPT (OpenAI)</option>
          <option value="claude">Anthropic Claude</option>
          <option value="groq">Groq API</option>
        </select>

        <label style={{ fontWeight: "bold" }}>Tu API Key:</label>
        <input 
          type="password" 
          placeholder="Pega tu clave aquí de forma segura..." 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} 
          required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button 
          type="submit" 
          style={{ padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#0070f3", color: "white", fontWeight: "bold", cursor: "pointer" }}
        >
          Encriptar y Guardar Llave
        </button>
      </form>

      {status && (
        <div style={{ marginTop: "20px", padding: "10px", borderRadius: "5px", backgroundColor: "#f0f0f0", border: "1px solid #ddd", fontWeight: "bold" }}>
          {status}
        </div>
      )}
    </div>
  );
}
