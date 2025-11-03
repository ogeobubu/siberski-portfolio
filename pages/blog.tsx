import React from "react";
import Head from "next/head";
import Blog from "../src/components/blog";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>AML Blog | Latest Compliance Insights & Regulatory Updates</title>
        <meta name="description" content="Get the latest AML compliance insights, regulatory updates, and expert analysis. Stay informed about Anti-Money Laundering best practices, financial crime prevention, and industry trends." />
        <meta name="keywords" content="AML Blog, Compliance Blog, Financial Crime Blog, Regulatory Updates, AML Insights, Compliance Training" />
        <meta name="author" content="AMLDecoded" />
        <meta name="google-site-verification" content="5UE1LEtXWiGmbk9UZJkp3P4JTt4d18RZy6jsVzy7DSU" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amldecoded.com/blog" />
        <meta property="og:title" content="Blog | AMLDecoded - AML Compliance Insights" />
        <meta property="og:description" content="Stay updated with the latest insights on Anti-Money Laundering compliance and regulatory updates." />
        <meta property="og:image" content="https://amldecoded.com/blog-og-image.jpg" />
        <meta property="og:site_name" content="AMLDecoded" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amldecoded.com/blog" />
        <meta property="twitter:title" content="Blog | AMLDecoded - AML Compliance Insights" />
        <meta property="twitter:description" content="Stay updated with the latest insights on Anti-Money Laundering compliance and regulatory updates." />
        <meta property="twitter:image" content="https://amldecoded.com/blog-twitter-image.jpg" />

        <link rel="canonical" href="https://amldecoded.com/blog" />
      </Head>

      <Blog />
    </>
  );
}