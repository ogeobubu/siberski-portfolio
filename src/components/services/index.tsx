import { useRef } from "react";
import { motion } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      ref={ref}
      animate={"animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          I focus on Compliance Mastery, Risk Mitigation,
          <br /> Regulatory Agility and Dynamic Solutions
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="Team collaboration illustration" loading="lazy" />
          <h2>
            <motion.b whileHover={{ color: "orange" }}>Unique</motion.b> Ideas
          </h2>
        </div>
        <div className="title">
          <h2>
            <motion.b whileHover={{ color: "orange" }}>For Your</motion.b>{" "}
            Business.
          </h2>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h3>Regulatory Compliance Expertise</h3>
          <p>
            We specialize in regulatory compliance and finance, focusing on Anti
            Money Laundering (AML), Risk Assessment, Transaction Monitoring,
            Financial Crime, and KYC/Counterparties requirements. With deep
            expertise in the Bank Secrecy Act (BSA), USA PATRIOT Act (USAPA),
            OFAC, FIU, FATCA, POCA, and other anti-money laundering laws, we
            conduct high-risk assessments effortlessly.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h3>Proven Track Record</h3>
          <p>
            Our team boasts a proven track record in global compliance within
            the financial services sector. Certified in Anti Money Laundering
            and holding an ICA International Advanced Certificate, we
            effectively apply our knowledge to ensure compliance and mitigate
            risks.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h3>Adaptability and Forward-Thinking</h3>
          <p>
            We excel in adapting to evolving regulations, staying ahead of the
            curve to meet new challenges head-on. Trust us to navigate the
            dynamic regulatory landscape and thrive in fast-paced environments.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h3>Compliance Assurance</h3>
          <p>
            Count on us to ensure that your team is always prepared to tackle
            new challenges and comply with changing regulations. As adaptable
            and forward-thinking professionals, we thrive in any fast-paced and
            dynamic work environment.
          </p>
          <button>Go</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
