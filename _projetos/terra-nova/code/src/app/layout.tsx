import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Restaurante Terra Nova | Comida Caseira em Perdizes",
  description: "Comida caseira preparada com carinho no coração de Perdizes. Conheça o Restaurante Terra Nova, consulte o cardápio e veja como chegar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body antialiased bg-brand-cream-050 text-neutral-950">
        {children}
      </body>
    </html>
  );
}
