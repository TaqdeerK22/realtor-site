import "./globals.css";
import { Playfair_Display, Manrope } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lovepreet Realty",
  description: "Luxury real estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
