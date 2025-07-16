import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Fryer Interest Form",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
