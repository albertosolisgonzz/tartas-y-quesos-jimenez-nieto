import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tartas y Quesos Jimenez Nieto",
  description: "Artesanía en cada bocado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-white text-stone-900`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </CartProvider>

      </body>
    </html>
  );
}
