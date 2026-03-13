import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cine-Stream",
  description: "Discover popular movies and find mood-based recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col items-center w-full bg-zinc-950 text-slate-100 font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main className="flex-grow w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
