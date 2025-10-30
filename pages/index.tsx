import Head from 'next/head';
import Cursor from "../src/components/cursor";
import Navbar from "../src/components/navbar";
import Hero from "../src/components/hero";
import Parallax from "../src/components/parallax";
import Services from "../src/components/services";
import Portfolio from "../src/components/portfolio";
import Contact from "../src/components/contact";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AMLDecoded",
    "description": "Comprehensive resource for Anti-Money Laundering compliance education and professional development",
    "url": "https://amldecoded.vercel.app",
    "sameAs": [
      "https://www.linkedin.com/company/amldecoded"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "AMLDecoded",
      "url": "https://amldecoded.vercel.app"
    },
    "about": [
      "Anti-Money Laundering (AML)",
      "Financial Crime Prevention",
      "Regulatory Compliance",
      "Risk Assessment",
      "KYC (Know Your Customer)",
      "Transaction Monitoring",
      "Compliance Training"
    ],
    "offers": [
      {
        "@type": "Book",
        "name": "Mastering AML Compliance",
        "description": "Comprehensive guide to Anti-Money Laundering"
      },
      {
        "@type": "Book",
        "name": "Financial Crime Prevention",
        "description": "Advanced techniques for modern banking"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>AMLDecoded | Demystifying Anti-Money Laundering Compliance</title>
        <meta name="description" content="AMLDecoded - Your comprehensive resource for Anti-Money Laundering compliance. Expert books, educational content, and tools to help you navigate AML regulations and best practices." />
        <meta name="keywords" content="AML, Anti-Money Laundering, Compliance, Regulatory Compliance, Financial Crime Prevention, AML Training, KYC, Risk Assessment, Compliance Tools, AMLDecoded" />
        <meta name="author" content="AMLDecoded" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://amldecoded.vercel.app" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amldecoded.vercel.app" />
        <meta property="og:title" content="AMLDecoded | Demystifying Anti-Money Laundering Compliance" />
        <meta property="og:description" content="Your comprehensive resource for Anti-Money Laundering compliance. Expert books, educational content, and tools to help you navigate AML regulations." />
        <meta property="og:image" content="https://amldecoded.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="AMLDecoded" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amldecoded.vercel.app" />
        <meta property="twitter:title" content="AMLDecoded | Demystifying Anti-Money Laundering Compliance" />
        <meta property="twitter:description" content="Your comprehensive resource for Anti-Money Laundering compliance. Expert books, educational content, and tools to help you navigate AML regulations." />
        <meta property="twitter:image" content="https://amldecoded.vercel.app/twitter-image.jpg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <Cursor />
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <section id="Services">
        <Parallax type="services" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section>
    </>
  );
}