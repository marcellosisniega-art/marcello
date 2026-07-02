import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcello Sisniega — Innovación incómoda | Speaker de innovación",
  description:
    "Conferencias y talleres para mover proyectos, equipos y decisiones. Innovación, diseño estratégico e inteligencia artificial aplicada para empresas, universidades e instituciones.",
  openGraph: {
    title: "Marcello Sisniega — Innovación incómoda",
    description:
      "Conferencias y talleres para mover proyectos, equipos y decisiones.",
    locale: "es_GT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-ink font-sans text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
