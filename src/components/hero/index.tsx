import { motion, Variants } from "framer-motion";
import Link from "next/link";

const textVariants: Variants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const sliderVariants: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>AMLDecoded</motion.h2>
          <motion.h1 variants={textVariants}>
            Demystifying Anti-Money Laundering
          </motion.h1>
          <motion.p variants={textVariants} className="subtitle">
            Comprehensive Resources for AML Compliance Professionals
          </motion.p>
          <motion.div variants={textVariants} className="buttons">
            <motion.button
              variants={textVariants}
              onClick={() => document.getElementById('Portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to portfolio section"
            >
              See the Latest Works
            </motion.button>
            <Link href="/books">
              <motion.button
                variants={textVariants}
                aria-label="View my books"
              >
                My Books
              </motion.button>
            </Link>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt="Scroll down indicator"
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Regulatory Compliance • Risk Management • Financial Crime Prevention
      </motion.div>
      <div className="contentContainer">
        <motion.div
          className="featuresContainer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="feature">
            <div className="icon">📚</div>
            <h4>Expert Books</h4>
            <p>Comprehensive AML compliance guides</p>
          </div>
          <div className="feature">
            <div className="icon">🎥</div>
            <h4>Educational Content</h4>
            <p>TikTok videos and tutorials</p>
          </div>
          <div className="feature">
            <div className="icon">🛡️</div>
            <h4>Compliance Tools</h4>
            <p>Risk assessment frameworks</p>
          </div>
          <div className="feature">
            <div className="icon">📋</div>
            <h4>Regulatory Updates</h4>
            <p>Latest AML regulations and trends</p>
          </div>
        </motion.div>

        <motion.div
          className="ctaContainer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="ctaText">Start your AML compliance journey today</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
