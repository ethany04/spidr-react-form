import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Fryer Interest Form",
  icons: {
    icon: "/spidr-logo.png", // or any other path if you change the file type
  },
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
