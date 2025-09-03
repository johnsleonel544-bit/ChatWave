import type { Metadata } from 'next';
import './globals.css';
import { FontProvider } from '@/components/theme/font-provider';

export const metadata: Metadata = {
  title: 'LuminaChat - Next Generation Messaging',
  description: 'Next Generation Messaging',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <FontProvider>{children}</FontProvider>
      </body>
    </html>
  );
}
