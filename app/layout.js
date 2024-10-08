import { Poppins, Gruppo, Inter } from "@next/font/google";
import "./globals.css";

// Import Poppins font
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Import Inter font
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

// Import Gruppo font
const gruppo = Gruppo({
  weight: "400", // Gruppo only has one weight
  subsets: ["latin"],
  variable: "--font-gruppo",
});

export const metadata = {
  title: "Finest VA",
  description: "As the title says, we provide the finest virtual assistants...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${poppins.variable} ${gruppo.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
