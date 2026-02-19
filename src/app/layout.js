import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "app/components/Header/Header";
import { Footer } from "app/components/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio Julian Salamanca",
  description: "Pablo Julian Salamanca Bernal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layoutWrapper">
          <Header />
          <main className="layoutContent">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
