import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "FreelanceHub — Find Top Freelancers",
    template: "%s | FreelanceHub",
  },
  description:
    "Browse thousands of professional services, post your project, and connect with skilled freelancers. Quality work, secure payments, every time.",
  keywords: ["freelance", "marketplace", "hire freelancers", "post projects", "remote work"],
  authors: [{ name: "FreelanceHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freelancehub.com",
    siteName: "FreelanceHub",
    title: "FreelanceHub — Find Top Freelancers",
    description: "Browse thousands of professional services and connect with skilled freelancers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
