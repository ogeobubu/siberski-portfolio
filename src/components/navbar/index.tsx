import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../sidebar";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div className="navbar">
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.span>
        <div className="social">
          {isHomePage ? (
            <a href="https://www.tiktok.com/@alwaysbullish1" target="_blank" rel="noopener noreferrer">
              <img src="/tiktok.png" alt="TikTok" />
            </a>
          ) : (
            <Link href="/" className="homeLink">
              ← Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
