import React from "react";
// import "./about.scss";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <motion.div
          className="aboutContent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="aboutTitle"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <motion.div
            className="aboutText"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              With a strong foundation in financial crime prevention and regulatory compliance, I bring a detail-oriented and analytical approach to safeguarding institutions against fraud, money laundering, and other financial threats. My experience spans key areas such as Know Your Customer (KYC), Anti-Money Laundering (AML), and Counter-Terrorist Financing (CTF), where I have consistently demonstrated a commitment to upholding industry standards and regulatory expectations.
            </p>

            <p>
              I have worked closely with financial crime teams, senior stakeholders, and client-facing departments to ensure robust due diligence and risk assessment processes. I'm adept at interpreting complex ownership structures, conducting Enhanced Due Diligence (EDD), and managing ongoing client reviews with precision and care. My ability to communicate effectively across teams and navigate regulatory developments allows me to contribute meaningfully to compliance strategies and operational improvements.
            </p>

            <p>
              Completed ICA certifications, I continue to deepen my expertise in global compliance frameworks, financial crime typologies, and ethical risk management. This ongoing professional development reflects my dedication to staying ahead of evolving regulations and best practices in the field.
            </p>

            <p>
              Whether supporting client onboarding, refreshing KYC records, or testing compliance tools from an end-user perspective, I approach each task with integrity, curiosity, and a drive to protect the financial ecosystem.
            </p>

            <motion.div
              className="aboutCTA"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="ctaText">
                Kindly reach out for any sort of support, either if you are breaking through AML compliance. I'm here to help. Let's create a financial crime free world together
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;