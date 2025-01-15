import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Microservices Architecture Showcase | Advanced Software Engineering",
  description:
    "Explore a cutting-edge microservices architecture proof-of-concept. Demonstrating expertise in TypeScript, Docker, Kubernetes, Redis, RabbitMQ, and more.",
  keywords:
    "microservices, architecture, TypeScript, Docker, Kubernetes, Redis, RabbitMQ, software engineering",
  openGraph: {
    title: "Microservices Architecture Showcase",
    description:
      "A proof-of-concept demonstrating expertise in advanced software architecture and DevOps practices.",
    url: "https://microservices-chat-docs.vercel.app/",
    siteName: "Microservices Showcase",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://microservices-chat-docs.vercel.app/docs.svg",
        width: 1200,
        height: 630,
        alt: "Microservices Architecture Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Microservices Architecture Showcase",
    description:
      "Explore advanced software architecture and DevOps practices in action.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="canonical"
          href="https://microservices-chat-docs.vercel.app/"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="Z5SlATHSmQRrLuyMXnq0-qq42wRlF5xGhwFib_Te8Mc"
        />
      </head>
      <body className={inter.className + " dark"}>
        {children}
        <Script id="schema-script" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "Microservices Architecture Showcase",
              "description": "A proof-of-concept demonstrating expertise in advanced software architecture, DevOps practices, and cutting-edge technologies.",
              "author": {
                "@type": "Person",
                "name": "Siddharth Salunkhe"
              },
              "datePublished": "2023-06-15",
              "dateModified": "2023-06-15",
              "articleSection": "Software Architecture",
              "keywords": "microservices, architecture, TypeScript, Docker, Kubernetes, Redis, RabbitMQ, software engineering"
            }
          `}
        </Script>
      </body>
    </html>
  );
}
