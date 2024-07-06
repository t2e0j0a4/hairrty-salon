import "./globals.css";
import type { Metadata } from "next";

// React-hot-toast
import { Toaster } from "react-hot-toast";

// Fonts
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Salon Registration | Hairrty",
  description: "Register your salon with us. Get clients globally.",
  keywords: ["hairrty", "hairrty salons", "salons", "hyderabad salons"],
  authors: [{ name: 'Valiveti Nagateja' }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster containerStyle={{ zIndex: 1001, fontSize: '0.8rem' }} gutter={5} />
        {children}
      </body>
    </html>
  );
}
