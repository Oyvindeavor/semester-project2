import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
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
        <ThemeRegistry>{props.children}</ThemeRegistry>
      </body>
    </html>
  );
}
