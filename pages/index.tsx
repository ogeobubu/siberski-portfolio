import Head from 'next/head';
import Cursor from "../src/components/cursor";
import Navbar from "../src/components/navbar";
import Hero from "../src/components/hero";
import Parallax from "../src/components/parallax";
import Services from "../src/components/services";
import Portfolio from "../src/components/portfolio";
import About from "../src/components/about";
import Contact from "../src/components/contact";
// import Books from "../src/components/books";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AMLDecoded",
    "description": "Comprehensive resource for Anti-Money Laundering compliance education and professional development",
    "url": "https://amldecoded.com",
    "sameAs": [
      "https://www.linkedin.com/company/amldecoded"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "AMLDecoded",
      "url": "https://amldecoded.com"
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
    ],
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Anti-Money Laundering (AML)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anti-Money Laundering (AML) refers to the laws, regulations, and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income."
        }
      },
      {
        "@type": "Question",
        "name": "Why is AML compliance important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AML compliance is crucial for preventing financial crime, protecting institutions from fraud, ensuring regulatory compliance, and maintaining the integrity of the global financial system."
        }
      },
      {
        "@type": "Question",
        "name": "What services does AMLDecoded offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AMLDecoded offers expert books, educational content, compliance training, regulatory updates, risk assessment tools, and professional consulting services for AML compliance."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>AMLDecoded | Expert AML Compliance Training & Resources</title>
        <meta name="description" content="Master Anti-Money Laundering compliance with AMLDecoded. Get expert books, compliance training, regulatory updates, and practical tools for financial crime prevention. Start your AML journey today!" />
        <meta name="keywords" content="AML, Anti-Money Laundering, Compliance, Regulatory Compliance, Financial Crime Prevention, AML Training, KYC, Risk Assessment, Compliance Tools, AMLDecoded" />
        <meta name="author" content="AMLDecoded" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="5UE1LEtXWiGmbk9UZJkp3P4JTt4d18RZy6jsVzy7DSU" />
        <link rel="canonical" href="https://amldecoded.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amldecoded.com" />
        <meta property="og:title" content="AMLDecoded | Expert AML Compliance Training & Resources" />
        <meta property="og:description" content="Master Anti-Money Laundering compliance with expert books, training, and tools. Stay ahead of regulatory requirements and prevent financial crime." />
        <meta property="og:image" content="https://amldecoded.com/og-image.jpg" />
        <meta property="og:site_name" content="AMLDecoded" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amldecoded.com" />
        <meta property="twitter:title" content="AMLDecoded | Expert AML Compliance Training & Resources" />
        <meta property="twitter:description" content="Master Anti-Money Laundering compliance with expert books, training, and tools. Stay ahead of regulatory requirements and prevent financial crime." />
        <meta property="twitter:image" content="https://amldecoded.com/twitter-image.jpg" />

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
      <section id="About">
        <About />
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