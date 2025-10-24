import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: {
    default: "Frilanskalkylatorn - Beräkna lön och utdelning för svenska frilansare",
    template: "%s | Frilanskalkylatorn"
  },
  description: "Gratis kalkylator för svenska frilansare. Beräkna optimal lön, utdelning och skatter. Byggt för svenskt skattesystem 2024. Få omedelbar feedback på din ekonomi.",
  keywords: [
    "frilans kalkylator",
    "lönekalkylator",
    "utdelningskalkylator", 
    "skattekalkylator",
    "frilansare sverige",
    "aktiebolag lön",
    "egenanställning",
    "svenska skatter",
    "timpris kalkylator",
    "företagare ekonomi"
  ],
  authors: [{ name: "Frilanskalkylatorn" }],
  creator: "Frilanskalkylatorn",
  publisher: "Frilanskalkylatorn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://your-domain.com', // Replace with your actual domain
    title: 'Frilanskalkylatorn - Beräkna lön och utdelning för svenska frilansare',
    description: 'Gratis kalkylator för svenska frilansare. Beräkna optimal lön, utdelning och skatter. Byggt för svenskt skattesystem 2024.',
    siteName: 'Frilanskalkylatorn',
    images: [
      {
        url: '/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Frilanskalkylatorn - Ekonomikalkylator för svenska frilansare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frilanskalkylatorn - Beräkna lön och utdelning för svenska frilansare',
    description: 'Gratis kalkylator för svenska frilansare. Beräkna optimal lön, utdelning och skatter.',
    images: ['/og-image.png'], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console and Bing Webmaster Tools
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topbar />
        {children}
      </body>
    </html>
  );
}
