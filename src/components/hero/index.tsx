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
          <motion.h2 variants={textVariants}>AlwaysBullish</motion.h2>
          <motion.h1 variants={textVariants}>
            AML & Financial Crime Manager
          </motion.h1>
          <motion.p variants={textVariants} className="subtitle">
            Expert Regulatory Compliance Professional | Risk Mitigation Specialist
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
          className="statsContainer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="stat">
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              10+
            </motion.h3>
            <p>Years Experience</p>
          </div>
          <div className="stat">
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              500+
            </motion.h3>
            <p>Clients Served</p>
          </div>
          <div className="stat">
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              99%
            </motion.h3>
            <p>Compliance Success Rate</p>
          </div>
        </motion.div>

        <motion.div
          className="featuresContainer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <div className="feature">
            <div className="icon">🎯</div>
            <h4>Risk Assessment</h4>
            <p>Comprehensive AML risk evaluation</p>
          </div>
          <div className="feature">
            <div className="icon">📊</div>
            <h4>Transaction Monitoring</h4>
            <p>Advanced fraud detection systems</p>
          </div>
          <div className="feature">
            <div className="icon">📋</div>
            <h4>Regulatory Compliance</h4>
            <p>Full compliance framework implementation</p>
          </div>
          <div className="feature">
            <div className="icon">🎓</div>
            <h4>Training & Education</h4>
            <p>AML certification and staff training</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
