import React, { useState, useEffect } from "react";
import Link from "next/link";
// import styles from "./blog.module.scss";
import { motion } from "framer-motion";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="blog">
        <div className="blogContainer">
          <div className="loadingContainer">
            <div className="loadingSpinner"></div>
            <h3>Loading amazing AML insights...</h3>
            <p>Please wait while we fetch the latest blog posts</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="blogContainer">
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>AMLDecoded Blog</h1>
          <h2>Insights, guides, and updates on Anti-Money Laundering compliance</h2>
        </motion.div>

        <div className="blogGrid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post._id}
              className="blogCard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {post.image && (
                <div className="blogImage">
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px 8px 0 0'
                    }}
                  />
                </div>
              )}
              <div className="blogContent">
                <div className="blogMeta">
                  <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <h3>{post.title}</h3>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.content.length > 150
                      ? post.content.substring(0, 150) + '...'
                      : post.content
                  }}
                />

                <div className="blogFooter">
                  <span className="author">By {post.author}</span>
                  <Link href={`/blog/${post._id}`}>
                    <button
                      className="readMore"
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'orange',
                        color: '#0c0c1d',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
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
                      Read More
                    </button>
                  </Link>
                </div>

                {/* Internal Links */}
                <div style={{ marginTop: '15px', fontSize: '12px', color: '#b0b0b0' }}>
                  <Link href="/books" style={{ color: '#b0b0b0', textDecoration: 'none', marginRight: '15px' }}>
                    📚 Related Books
                  </Link>
                  <Link href="/#Services" style={{ color: '#b0b0b0', textDecoration: 'none' }}>
                    🛡️ Our Services
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="newsletter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest AML insights and regulatory updates.</p>
          <div className="newsletterForm">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;