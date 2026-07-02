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
  metadataBase: new URL("https://marcello-sisniega.vercel.app"),
  title: "Marcello Sisniega — Innovación incómoda | Speaker de innovación",
  description:
    "Conferencias y talleres para mover proyectos, equipos y decisiones. Innovación, diseño estratégico e inteligencia artificial aplicada para empresas, universidades e instituciones.",
  openGraph: {
    title: "Marcello Sisniega — Innovación incómoda",
    description:
      "Conferencias y talleres para mover proyectos, equipos y decisiones.",
    locale: "es_GT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marcello Sisniega hablando con micrófono durante una conferencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcello Sisniega — Innovación incómoda",
    description:
      "Conferencias y talleres para mover proyectos, equipos y decisiones.",
    images: ["/og-image.jpg"],
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
