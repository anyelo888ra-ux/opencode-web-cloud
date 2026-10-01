import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Discord
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub; // Guardamos de forma segura el ID único de la red social
      }
      return session;
    },
  },
});
