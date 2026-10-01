import { auth, signIn, signOut } from "@/src/auth";

export default async function Home() {
  const session = await auth();

  // Si no está logueado, obligamos el inicio de sesión para cuidar las API Keys
  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: 'sans-serif', gap: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#58a6ff' }}>🤖 OpenCode Web Cloud</h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem' }}>Inicia sesión de forma segura para usar tus API Keys sin riesgos de robo.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
          <form action={async () => { "use server"; await signIn("github"); }}>
            <button style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#21262d', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Entrar con GitHub</button>
          </form>
          <form action={async () => { "use server"; await signIn("google"); }}>
            <button style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#ea4335', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Entrar con Google</button>
          </form>
          <form action={async () => { "use server"; await signIn("discord"); }}>
            <button style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#5865F2', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Entrar con Discord</button>
          </form>
        </div>
      </div>
    );
  }

  // Interfaz del Chat de OpenCode protegido
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: 'sans-serif' }}>
      
      {/* Barra Lateral Izquierda */}
      <aside style={{ width: '260px', backgroundColor: '#161b22', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #30363d' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: '#58a6ff', marginBottom: '20px' }}>📁 OpenCode Cloud</h2>
          <p style={{ fontSize: '0.9rem', color: '#8b949e' }}>Conectado como:<br/><strong style={{ color: '#fff' }}>{session.user?.name}</strong></p>
          
          <nav style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="/" style={{ color: '#58a6ff', textDecoration: 'none', fontWeight: 'bold' }}>💬 Chat Agente</a>
            <a href="/config" style={{ color: '#8b949e', textDecoration: 'none' }}>🔒 Configurar Keys</a>
          </nav>
        </div>

        <form action={async () => { "use server"; await signOut(); }}>
          <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #f85149', backgroundColor: 'transparent', color: '#f85149', cursor: 'pointer', fontWeight: 'bold' }}>
            Cerrar Sesión
          </button>
        </form>
      </aside>

      {/* Ventana de Chat Principal */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
        <header style={{ borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
          <h3>🤖 Agente de Código Activo</h3>
          <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: 0 }}>Tus peticiones usan tus llaves encriptadas de forma invisible y anti-robos.</p>
        </header>

        {/* Zona de mensajes (Historial simulado) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ backgroundColor: '#21262d', padding: '12px', borderRadius: '8px', maxWidth: '70%' }}>
            <strong>OpenCode Cloud:</strong> ¡Hola! ¿Qué código o script quieres que genere y ejecute hoy en el navegador?
          </div>
        </div>

        {/* Input de Texto */}
        <footer style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Escribe una instrucción al agente (Ej: Crea una función que sume dos números en Python)..." 
            style={{ flex: 1, padding: '14px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#21262d', color: '#fff', outline: 'none' }}
          />
          <button style={{ padding: '0 24px', borderRadius: '6px', border: 'none', backgroundColor: '#238636', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            Enviar
          </button>
        </footer>
      </main>

    </div>
  );
}
