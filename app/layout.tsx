import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just Keep Talking | English that moves with you",
  description:
    "Private, personalized online English classes built around your goals and your voice.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
