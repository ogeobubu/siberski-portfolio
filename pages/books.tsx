import Head from 'next/head';
import Books from "../src/components/books";

export default function BooksPage() {
  const booksStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AML & Financial Crime Books by AlwaysBullish",
    "description": "Professional books on Anti-Money Laundering compliance and financial crime prevention",
    "author": {
      "@type": "Person",
      "name": "AlwaysBullish",
      "jobTitle": "AML & Financial Crime Manager"
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
        "author": "AlwaysBullish",
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
        <title>My Books | AlwaysBullish - AML & Financial Crime Manager</title>
        <meta name="description" content="Purchase expert books on AML compliance and financial crime prevention by AlwaysBullish, Regulatory Compliance Professional and AML expert." />
        <meta name="keywords" content="AML Books, Financial Crime Books, Compliance Books, Anti-Money Laundering, Regulatory Compliance, Purchase Books, AML Training, Compliance Training, AlwaysBullish" />
        <meta name="author" content="AlwaysBullish" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://alwaysbullish.com/books" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alwaysbullish.com/books" />
        <meta property="og:title" content="Books by AlwaysBullish | AML & Financial Crime Expert" />
        <meta property="og:description" content="Purchase professional books on Anti-Money Laundering compliance and financial crime prevention by AlwaysBullish." />
        <meta property="og:image" content="https://alwaysbullish.com/books-og-image.jpg" />
        <meta property="og:site_name" content="AlwaysBullish Portfolio" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://alwaysbullish.com/books" />
        <meta property="twitter:title" content="Books by AlwaysBullish | AML & Financial Crime Expert" />
        <meta property="twitter:description" content="Purchase professional books on Anti-Money Laundering compliance and financial crime prevention by AlwaysBullish." />
        <meta property="twitter:image" content="https://alwaysbullish.com/books-twitter-image.jpg" />

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