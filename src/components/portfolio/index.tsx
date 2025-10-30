import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Item {
  id: number;
  title: string;
  videoEmbed: string;
  desc: string;
}

const items: Item[] = [
  {
    id: 1,
    title: "Introduction Video",
    videoEmbed:
      '<iframe src="https://www.tiktok.com/@alwaysbullish1/video/7344667248591719713" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    desc: "Let me introduce myself",
  },
  {
    id: 2,
    title: "AML Career Tips",
    videoEmbed:
      '<iframe src="https://www.tiktok.com/@alwaysbullish1/video/7356339286477671713" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    desc: "AML career tips",
  },
  {
    id: 3,
    title: "Compliance Insights",
    videoEmbed:
      '<iframe src="https://www.tiktok.com/@alwaysbullish1/video/7360000000000000000" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    desc: "Latest compliance trends and insights",
  },
];

const Single: React.FC<{ item: Item }> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div
            className="imageContainer"
            ref={ref}
            dangerouslySetInnerHTML={{ __html: item.videoEmbed }}
          ></div>
          <motion.div className="textContainer" style={{ y }}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
            <button
              onClick={() => window.open(`https://www.tiktok.com/@alwaysbullish1/video/${item.videoEmbed.match(/video\/(\d+)/)?.[1]}`, '_blank')}
              aria-label={`Watch ${item.title} on TikTok`}
            >
              Watch on TikTok
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Recent TikTok Videos</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
