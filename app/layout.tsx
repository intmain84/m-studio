import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import StateWrapper from "@/components/StateWrapper";

const mainFont = Geist_Mono({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The M Studio",
  description:
    "A completely private space with just you, a large mirror, and a clicker in your hand. Premium camera and professional lighting are already perfectly tuned.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mainFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <div
          style={{
            backgroundImage: "url('/noise.gif')",
            backgroundSize: "90px",
            opacity: 0.35,
            height: "100dvh",
            width: "100dvw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999999,
            pointerEvents: "none",
            mixBlendMode: "multiply",
          }}
        />
        <StateWrapper>{children}</StateWrapper>
      </body>
    </html>
  );
}
