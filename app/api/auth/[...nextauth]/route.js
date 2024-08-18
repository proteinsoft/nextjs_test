import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch('https://www.melivecode.com/api/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                })

                const response = await res.json()

                if (response.status === 'ok') {
                    return response.user
                } else {
                  throw new Error('Invalid email or password')
                }
            },
        }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id
        }
        return token
      },
      session: async ({ session, token }) => {
        if (session.user) {
          session.user.id = token.id
        }
        return session
      },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }