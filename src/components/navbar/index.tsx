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
            <>
              <a href="https://www.facebook.com/alwaysbullish1" target="_blank" rel="noopener noreferrer">
                <img src="/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/alwaysbullish1" target="_blank" rel="noopener noreferrer">
                <img src="/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/@alwaysbullish1" target="_blank" rel="noopener noreferrer">
                <img src="/youtube.png" alt="YouTube" />
              </a>
              <a href="https://dribbble.com/alwaysbullish" target="_blank" rel="noopener noreferrer">
                <img src="/dribbble.png" alt="Dribbble" />
              </a>
            </>
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
