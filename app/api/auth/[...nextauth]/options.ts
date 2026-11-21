import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your password",
                }
            },
            async authorize(credentials) {
                const adminPassword = process.env.NEXTAUTH_PASSWORD;

                // Ohne gesetztes Passwort niemals einloggen lassen
                if (!adminPassword || !credentials?.password) {
                    return null;
                }

                if (credentials.password === adminPassword) {
                    return { id: "42", name: "Admin" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl + "/admin"; // <<< IMMER redirect nach Login
        },
    },
}
