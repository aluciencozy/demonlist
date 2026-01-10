import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import NavBar from "@/app/components/NavBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demonlist Ultimate",
  description: "The ultimate platform for demonlist tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${figtree.variable} antialiased`}>
        <NavBar />
        <div className="w-full font-figtree">{children}</div>
        <Toaster position="top-center" richColors={true} />
      </body>
    </html>
  );
}
