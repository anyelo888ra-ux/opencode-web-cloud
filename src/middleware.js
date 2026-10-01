import { auth } from "@/src/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Si intenta entrar al panel de OpenCode o configuraciones sin estar logueado, lo mandamos al inicio
  if (!isLoggedIn && (nextUrl.pathname.startsWith("/config") || nextUrl.pathname.startsWith("/api/opencode"))) {
    return Response.json({ error: "Acceso denegado. Login obligatorio." }, { status: 401 });
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
