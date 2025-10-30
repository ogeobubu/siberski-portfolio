import React from "react";
// import styles from "./blog.module.scss";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Anti-Money Laundering Regulations",
    excerpt: "A comprehensive guide to AML regulations and their importance in today's financial landscape.",
    content: "Anti-Money Laundering (AML) regulations are crucial for maintaining the integrity of the global financial system...",
    author: "AMLDecoded Team",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "AML Basics",
    image: "/blog1.jpg"
  },
  {
    id: 2,
    title: "KYC Best Practices for Financial Institutions",
    excerpt: "Learn the essential Know Your Customer procedures that every financial institution should implement.",
    content: "Know Your Customer (KYC) procedures are fundamental to AML compliance...",
    author: "AMLDecoded Team",
    date: "2025-01-10",
    readTime: "7 min read",
    category: "KYC",
    image: "/blog2.jpg"
  },
  {
    id: 3,
    title: "Transaction Monitoring: Detecting Suspicious Activities",
    excerpt: "How advanced transaction monitoring systems help identify and prevent financial crimes.",
    content: "Transaction monitoring is a critical component of any AML program...",
    author: "AMLDecoded Team",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Transaction Monitoring",
    image: "/blog3.jpg"
  },
  {
    id: 4,
    title: "Risk Assessment in AML Compliance",
    excerpt: "Conducting effective risk assessments to strengthen your AML compliance framework.",
    content: "Risk assessment is the foundation of any effective AML compliance program...",
    author: "AMLDecoded Team",
    date: "2024-12-28",
    readTime: "8 min read",
    category: "Risk Management",
    image: "/blog4.jpg"
  }
];

const Blog: React.FC = () => {
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
          <p>Insights, guides, and updates on Anti-Money Laundering compliance</p>
        </motion.div>

        <div className="blogGrid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blogCard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {post.image && (
                <div className="blogImage">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
              )}

              <div className="blogContent">
                <div className="blogMeta">
                  <span className="category">{post.category}</span>
                  <span className="date">{post.date}</span>
                  <span className="readTime">{post.readTime}</span>
                </div>

                <h2>{post.title}</h2>
                <p className="excerpt">{post.excerpt}</p>

                <div className="blogFooter">
                  <span className="author">By {post.author}</span>
                  <button className="readMore">Read More</button>
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
          <h2>Stay Updated</h2>
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