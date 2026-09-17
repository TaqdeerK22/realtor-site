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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Lovepreet Realty | BC Real Estate",
    template: "%s | Lovepreet Realty",
  },
  description:
    "Buy, sell, or invest in BC real estate with honest guidance and modern tools from Lovepreet Realty.",
  openGraph: {
    title: "Lovepreet Realty | BC Real Estate",
    description:
      "Buy, sell, or invest in BC real estate with honest guidance and modern tools from Lovepreet Realty.",
    type: "website",
  },
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
