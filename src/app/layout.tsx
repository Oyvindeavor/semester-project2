import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import NavBar from '@/components/navbar/navbar';
import { AuthProvider } from '@/context';
import './globals.scss';

// import custom components navbar etc here
export const metadata = {
  title: 'My Joy UI App',
  description: 'A Next.js app with Joy UI',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeRegistry options={{ key: 'joy' }}>
            <NavBar />
            {props.children}
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
