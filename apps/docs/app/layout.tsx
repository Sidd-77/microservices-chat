import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microservices Chat Application",
  description: "Documentation for Microservices Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content={"Documentation for Microservices Chat Application"} />
        <meta name="keywords" content="microservices, chat application, documentation, kubernetes, pub/sub, nodejs" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="Z5SlATHSmQRrLuyMXnq0-qq42wRlF5xGhwFib_Te8Mc" />
        <meta property="og:title" content={"Microservices Chat Application"} />
        <meta property="og:description" content={"Documentation for Microservices Chat Application"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://microservices-chat-docs.vercel.app/" />

      </Head>
      <body className={inter.className+ " dark"}>{children}</body>
    </html>
  );
}
