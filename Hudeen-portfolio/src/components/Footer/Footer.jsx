import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../client"; // Sanity client configuration
import "./Footer.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Add stagger effect
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const query = '*[_type == "footer"][0]'; // Fetch the first footer document
    client.fetch(query).then((data) => setFooterData(data));
  }, []);

  if (!footerData) {
    return null; // Handle loading or empty state
  }

  return (
    <motion.div
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div className="contact-headlines" variants={itemVariants}>
        <h1 className="contact-heading">{footerData.headline}</h1>
      </motion.div>

      <motion.div className="contact-links" variants={itemVariants}>
        <ul>
          {footerData.links.map((link, index) => (
            <motion.li key={index} variants={itemVariants}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.button
          className="buzz"
          onClick={() => window.location = 'mailto:Hudeen09@gmail.com'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {footerData.buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Footer;
