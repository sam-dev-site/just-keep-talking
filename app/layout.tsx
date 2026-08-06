import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just Keep Talking | 1:1 English Conversation Classes",
  description:
    "Personalized 1:1 online English conversation classes built around your goals, pace, and voice.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
