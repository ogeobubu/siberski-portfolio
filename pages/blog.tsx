import React from "react";
import Head from "next/head";
import Blog from "../src/components/blog";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | AMLDecoded - AML Compliance Insights & Updates</title>
        <meta name="description" content="Stay updated with the latest insights on Anti-Money Laundering compliance, regulatory updates, and best practices from AMLDecoded." />
        <meta name="keywords" content="AML Blog, Compliance Blog, Financial Crime Blog, Regulatory Updates, AML Insights, Compliance Training" />
        <meta name="author" content="AMLDecoded" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amldecoded.vercel.app/blog" />
        <meta property="og:title" content="Blog | AMLDecoded - AML Compliance Insights" />
        <meta property="og:description" content="Stay updated with the latest insights on Anti-Money Laundering compliance and regulatory updates." />
        <meta property="og:image" content="https://amldecoded.vercel.app/blog-og-image.jpg" />
        <meta property="og:site_name" content="AMLDecoded" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amldecoded.vercel.app/blog" />
        <meta property="twitter:title" content="Blog | AMLDecoded - AML Compliance Insights" />
        <meta property="twitter:description" content="Stay updated with the latest insights on Anti-Money Laundering compliance and regulatory updates." />
        <meta property="twitter:image" content="https://amldecoded.vercel.app/blog-twitter-image.jpg" />

        <link rel="canonical" href="https://amldecoded.vercel.app/blog" />
      </Head>

      <Blog />
    </>
  );
}