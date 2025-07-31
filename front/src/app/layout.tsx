import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/Footer";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Coleção Virtual",
  description: "Desenvolvido para o projeto final do trainee 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased min-h-screen flex flex-col `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
