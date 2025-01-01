import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client.js";
import Marquee from "react-fast-marquee";
import "../Hero/Hero.css";

function Hero() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "hero"]';
    client.fetch(query).then((data) => setData(data));
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {data.length > 0 ? (
        data.map((data, index) => (
          <motion.div
            key={data.name + index}
            className="hero-container"
            variants={itemVariants}
          >
            {/* Marquee Section */}
            <motion.div className="overflow" variants={fadeVariants}>
              <Marquee>
                <h1 className="fade">{data.fade}</h1>
              </Marquee>
            </motion.div>

             {/* Hero Grid */}
             <motion.div className="hero-grid" variants={itemVariants}>
              <div>
                <h2 className="heading">
                  <span className="pry-contrast">{data.headingSalutation}</span>{" "}
                  {data.name}
                </h2>
              </div>

              <motion.div className="hero-content" variants={itemVariants}>
                <p>{data.summary}</p>
              </motion.div>
            </motion.div>

             {/* Social Icons */}
             <motion.div className="social-icons" variants={containerVariants}>
              {data.socialMedia?.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                >
                  <i className={`fa-brands fa-${social.platform.toLowerCase()}`}></i>
                </motion.a>
              ))}
            </motion.div>

            {/* Patterns Image */}
            <motion.img
              className="patterns"
              src="./src/assets/Mask group.png"
              alt="Decorative patterns"
              variants={fadeVariants}
            />
          </motion.div>
        ))
      ) : (
        <motion.div className="loading-container" variants={fadeVariants}>
          <p>Loading...</p>
        </motion.div>
      )}
    </motion.header>
  );
}

export default Hero;
