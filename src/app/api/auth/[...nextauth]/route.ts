import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, Session } from 'next-auth';
import { noAuthHeaders } from '@api/config/headers';
import { noroffApi } from '@api/config/endpoints';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('Credentials are missing');
          return null;
        }

        const { email, password } = credentials;

        try {
          // Authenticate the user
          const response = await fetch(noroffApi.login, {
            method: 'POST',
            headers: noAuthHeaders(),
            body: JSON.stringify({ email, password }),
          });

          const result = await response.json();

          if (!response.ok) {
            const errorMessage =
              result.errors?.[0]?.message || 'Failed to login';
            console.error('Authentication failed:', errorMessage);
            throw new Error(errorMessage);
          }

          const userData = result.data;

          if (!userData.accessToken) {
            console.error('AccessToken is missing in the response.');
            return null;
          }

          const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.avatar?.url,
            imageAlt: userData.avatar?.alt,
            accessToken: userData.accessToken,
            bio: userData.bio,
          };

          return user;
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          imageAlt: user.imageAlt,
          bio: user.bio,
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      if (token.user) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email,
          image: token.user.image,
          imageAlt: token.user.imageAlt,
          bio: token.user.bio,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
