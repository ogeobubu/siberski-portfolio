import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../sidebar";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [tiktokUrl, setTiktokUrl] = useState('https://www.tiktok.com/@alwaysbullish1');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const settings = await response.json();
        if (settings.tiktokVideoUrl) {
          setTiktokUrl(settings.tiktokVideoUrl);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

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
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
              <img src="/tiktok.png" alt="Follow AMLDecoded on TikTok for AML compliance tips and updates" />
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
