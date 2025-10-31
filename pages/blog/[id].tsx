import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Navbar from '../../src/components/navbar';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogDetailProps {
  blog: BlogPost | null;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  if (!blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found - AMLDecoded</title>
        </Head>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #0c0c1d, #111132)',
          color: 'white',
          fontFamily: '"DM Sans", sans-serif',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Blog Not Found</h1>
            <p style={{ fontSize: '18px', marginBottom: '30px', color: '#b0b0b0' }}>
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <button style={{
                padding: '15px 30px',
                backgroundColor: 'orange',
                color: '#0c0c1d',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
              }}>
                ← Back to Blog
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} - AMLDecoded</title>
        <meta name="description" content={blog.content.substring(0, 160)} />
        <meta name="keywords" content="AML, Anti-Money Laundering, Compliance, Financial Crime, Regulatory Updates, AML Insights" />
        <meta name="author" content={blog.author} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <link rel="canonical" href={`https://amldecoded.com/blog/${blog._id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://amldecoded.com/blog/${blog._id}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 160)} />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta property="og:site_name" content="AMLDecoded" />
        <meta property="article:author" content={blog.author} />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://amldecoded.com/blog/${blog._id}`} />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.content.substring(0, 160)} />
        {blog.image && <meta property="twitter:image" content={blog.image} />}

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": blog.title,
              "description": blog.content.substring(0, 160),
              "image": blog.image || "https://amldecoded.com/og-image.jpg",
              "datePublished": blog.createdAt,
              "dateModified": blog.updatedAt,
              "author": {
                "@type": "Person",
                "name": blog.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "AMLDecoded",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://amldecoded.com/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://amldecoded.com/blog/${blog._id}`
              }
            }),
          }}
        />
      </Head>

      <Navbar />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0c0c1d, #111132)',
        color: 'white',
        fontFamily: '"DM Sans", sans-serif',
        padding: '20px 0',
      }}>
        {/* Breadcrumb Navigation */}
        <div style={{
          maxWidth: '1366px',
          margin: '0 auto',
          padding: '0 30px',
          marginBottom: '20px',
        }}>
          <nav aria-label="Breadcrumb" style={{
            fontSize: '14px',
            color: '#b0b0b0',
          }}>
            <Link href="/" style={{ color: '#b0b0b0', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/blog" style={{ color: '#b0b0b0', textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: 'white' }}>{blog.title}</span>
          </nav>
        </div>

        {/* Navigation */}
        <div style={{
          maxWidth: '1366px',
          margin: '0 auto',
          padding: '0 30px',
          marginBottom: '40px',
        }}>
          <Link href="/blog">
            <button style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#0c0c1d';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            >
              ← Back to Blog
            </button>
          </Link>
        </div>

        {/* Blog Content */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 30px',
        }}>
          {/* Article Header */}
          <header style={{ marginBottom: '50px', textAlign: 'center' }}>
            {blog.image && (
              <div style={{ marginBottom: '30px' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    maxWidth: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                />
              </div>
            )}
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}>
              {blog.title}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              color: '#b0b0b0',
              fontSize: '16px',
            }}>
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </header>

          {/* Article Content */}
          <article style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '50px',
            lineHeight: '1.8',
            fontSize: '18px',
          }}>
            <div
              style={{
                wordWrap: 'break-word',
                lineHeight: '1.8',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Article Footer */}
          <footer style={{
            marginTop: '50px',
            padding: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <h3 style={{
              color: 'white',
              marginBottom: '15px',
              fontSize: '20px',
            }}>
              Enjoyed this article?
            </h3>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '25px',
              fontSize: '16px',
            }}>
              Stay updated with the latest AML insights and regulatory updates.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/blog">
                <button style={{
                  padding: '15px 30px',
                  backgroundColor: 'orange',
                  color: '#0c0c1d',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 165, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 165, 0, 0.3)';
                }}
                >
                  Read More Articles
                </button>
              </Link>
              <Link href="/books">
                <button style={{
                  padding: '15px 30px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#0c0c1d';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                >
                  📚 Explore Our Books
                </button>
              </Link>
              <Link href="/#Contact">
                <button style={{
                  padding: '15px 30px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#0c0c1d';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
                >
                  💬 Get in Touch
                </button>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    // Fetch blog from API
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs/${id}`);
    const blog = await response.json();

    if (!response.ok) {
      return {
        props: {
          blog: null,
        },
      };
    }

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      props: {
        blog: null,
      },
    };
  }
};

export default BlogDetail;