import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
