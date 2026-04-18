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
  title: "Asesorias Pedagógicas y Projección Educativa",
  description: "Materiales para clases",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layoutWrapper">
          <Header />
          <main className="layoutContent">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
