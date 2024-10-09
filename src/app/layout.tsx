import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sharejson",
  description: "Share your JSON data with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
