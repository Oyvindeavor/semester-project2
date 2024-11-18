// import type { Metadata } from 'next';
import ThemeProvider from '@theme/ThemeProvider';
// import custom components navbar etc here
export const metadata = {
  title: 'My Joy UI App',
  description: 'A Next.js app with Joy UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
