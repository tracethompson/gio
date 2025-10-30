import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giovanni Cabrera",
  description: "An Untold Original - World #9 Boxer, Actor, Comedian, Singer",
  icons: {
    icon: '/favicon-gio.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
