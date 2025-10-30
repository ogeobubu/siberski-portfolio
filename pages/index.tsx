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
    "@type": "Person",
    "name": "AlwaysBullish",
    "jobTitle": "AML & Financial Crime Manager",
    "description": "Expert Regulatory Compliance Professional specializing in Anti-Money Laundering (AML), Financial Crime Prevention, and Risk Management",
    "url": "https://alwaysbullish.com",
    "sameAs": [
      "https://www.facebook.com/alwaysbullish1",
      "https://www.instagram.com/alwaysbullish1",
      "https://www.youtube.com/@alwaysbullish1",
      "https://dribbble.com/alwaysbullish"
    ],
    "knowsAbout": [
      "Anti-Money Laundering (AML)",
      "Financial Crime Prevention",
      "Regulatory Compliance",
      "Risk Assessment",
      "KYC (Know Your Customer)",
      "Transaction Monitoring",
      "Compliance Training",
      "Financial Services Regulation"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AML & Financial Crime Manager",
      "occupationLocation": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-123-123-123",
      "email": "mail@alwaysbullish.com",
      "contactType": "Professional",
      "areaServed": "GB",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      <Head>
        <title>AlwaysBullish | AML & Financial Crime Manager - Regulatory Compliance Expert</title>
        <meta name="description" content="AlwaysBullish - AML & Financial Crime Manager specializing in regulatory compliance, risk mitigation, and financial crime prevention. Expert in Anti-Money Laundering (AML), KYC, and compliance solutions." />
        <meta name="keywords" content="AML, Financial Crime, Compliance, Regulatory, Anti-Money Laundering, KYC, Risk Assessment, Finance Professional, Compliance Manager, Financial Services, AlwaysBullish" />
        <meta name="author" content="AlwaysBullish" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://alwaysbullish.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alwaysbullish.com" />
        <meta property="og:title" content="AlwaysBullish | AML & Financial Crime Manager" />
        <meta property="og:description" content="Expert Regulatory Compliance Professional specializing in Anti-Money Laundering (AML), Financial Crime Prevention, and Risk Management" />
        <meta property="og:image" content="https://alwaysbullish.com/og-image.jpg" />
        <meta property="og:site_name" content="AlwaysBullish Portfolio" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alwaysbullish.com" />
        <meta property="twitter:title" content="AlwaysBullish | AML & Financial Crime Manager" />
        <meta property="twitter:description" content="Expert Regulatory Compliance Professional specializing in Anti-Money Laundering (AML), Financial Crime Prevention, and Risk Management" />
        <meta property="twitter:image" content="https://alwaysbullish.com/twitter-image.jpg" />

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