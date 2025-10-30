import Head from 'next/head';
import Books from "../src/components/books";

export default function BooksPage() {
  const booksStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AML & Financial Crime Books by AMLDecoded",
    "description": "Professional books on Anti-Money Laundering compliance and financial crime prevention",
    "provider": {
      "@type": "Organization",
      "name": "AMLDecoded",
      "url": "https://amldecoded.vercel.app"
    },
    "itemListElement": [
      {
        "@type": "Book",
        "position": 1,
        "name": "Mastering AML Compliance",
        "description": "A comprehensive guide to Anti-Money Laundering covering regulatory requirements, risk assessment, and practical implementation strategies",
        "author": "Emeka O.",
        "genre": "Business & Finance",
        "numberOfPages": 320,
        "bookFormat": "EBook",
        "offers": {
          "@type": "Offer",
          "price": "49.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Book",
        "position": 2,
        "name": "Financial Crime Prevention",
        "description": "Advanced techniques for preventing financial crimes in modern banking environments",
        "provider": {
          "@type": "Organization",
          "name": "AMLDecoded"
        },
        "genre": "Business & Finance",
        "numberOfPages": 280,
        "bookFormat": "EBook",
        "offers": {
          "@type": "Offer",
          "price": "39.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>My Books | AMLDecoded - Expert AML Compliance Resources</title>
        <meta name="description" content="Purchase expert books on AML compliance and financial crime prevention by AMLDecoded. Comprehensive guides for regulatory compliance professionals." />
        <meta name="keywords" content="AML Books, Financial Crime Books, Compliance Books, Anti-Money Laundering, Regulatory Compliance, Purchase Books, AML Training, Compliance Training, AMLDecoded" />
        <meta name="author" content="AMLDecoded" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://amldecoded.vercel.app/books" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amldecoded.vercel.app/books" />
        <meta property="og:title" content="Books by AMLDecoded | Expert AML Compliance Resources" />
        <meta property="og:description" content="Purchase professional books on Anti-Money Laundering compliance and financial crime prevention by AMLDecoded." />
        <meta property="og:image" content="https://amldecoded.vercel.app/books-og-image.jpg" />
        <meta property="og:site_name" content="AMLDecoded" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amldecoded.vercel.app/books" />
        <meta property="twitter:title" content="Books by AMLDecoded | Expert AML Compliance Resources" />
        <meta property="twitter:description" content="Purchase professional books on Anti-Money Laundering compliance and financial crime prevention by AMLDecoded." />
        <meta property="twitter:image" content="https://amldecoded.vercel.app/books-twitter-image.jpg" />

        {/* Structured Data for Books */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(booksStructuredData),
          }}
        />
      </Head>

      <Books />
    </>
  );
}