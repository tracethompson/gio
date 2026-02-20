import type { Metadata } from "next";
import { Archivo, Bebas_Neue, Oswald } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giovanni Cabrera",
  description: "An Untold Original - World #8 Boxer, Actor, Comedian, Singer",
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
    <html lang="en" className={`${archivo.variable} ${bebasNeue.variable} ${oswald.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
