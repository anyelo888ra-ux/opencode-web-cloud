import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
        <h1>Bienvenido a OpenCode Web Cloud</h1>
        <p>Inicia sesión de forma segura para usar tus API Keys sin riesgos de robo.</p>
        <form action={async () => { "use server"; await signIn("github"); }}><button>Iniciar con GitHub</button></form>
        <form action={async () => { "use server"; await signIn("google"); }}><button>Iniciar con Google</button></form>
        <form action={async () => { "use server"; await signIn("discord"); }}><button>Iniciar con Discord</button></form>
      </div>
    );
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Panel de OpenCode Cloud</h1>
      <p>Hola, {session.user?.name}. Tu sesión está protegida y vinculada a tus llaves.</p>
      {/* Aquí irá el chat de OpenCode y el editor de código */}
      <form action={async () => { "use server"; await signOut(); }}><button>Cerrar Sesión</button></form>
    </main>
  );
}
