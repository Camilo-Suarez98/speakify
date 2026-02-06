import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speakify | Asistente de aprendizaje de idiomas",
  description:
    "Crea una ruta personalizada para aprender idiomas con una IA que adapta conversaciones, gramatica y ejercicios a tu nivel.",
  keywords: [
    "aprendizaje de idiomas",
    "asistente de idiomas",
    "IA educativa",
    "practicar conversacion",
    "gramatica",
    "estudio de idiomas"
  ],
  openGraph: {
    title: "Speakify | Asistente de aprendizaje de idiomas",
    description:
      "Personaliza tu aprendizaje con conversaciones y ejercicios guiados por IA.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speakify | Asistente de aprendizaje de idiomas",
    description:
      "Personaliza tu aprendizaje con conversaciones y ejercicios guiados por IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
