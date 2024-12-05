import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string; // Optional access token
    user: {
      id: string; // User ID
      name: string; // User's name
      email: string; // User's email
      image?: string; // Optional user avatar URL
      imageAlt?: string; // Optional alt text for avatar
      bio: string; // Optional user bio
    };
  }

  interface User {
    id: string; // User ID
    name: string; // User's name
    email: string; // User's email
    image?: string; // Optional user avatar URL
    imageAlt?: string; // Optional alt text for avatar
    accessToken: string; // Required access token
    bio: string; // Optional user bio
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string; // Optional access token
    user?: {
      id: string; // User ID
      name: string; // User's name
      email: string; // User's email
      image?: string; // Optional user avatar URL
      imageAlt?: string; // Optional alt text for avatar
      bio: string; // Optional user bio
    };
  }
}
