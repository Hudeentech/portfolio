import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../client";
import "./Footer.css";

function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client.fetch('*[_type == "footer"][0]').then(setFooterData);
  }, []);

  if (!footerData) return null;

  const year = new Date().getFullYear();

  const fade = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">

        {/* CTA Banner */}
        <motion.div
          className="contact-headlines"
          custom={0}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="contact-heading">{footerData.headline}</h1>
          <span className="contact-tagline">Let's build something remarkable</span>

          <motion.button
            className="buzz"
            onClick={() => window.location = 'mailto:Hudeen09@gmail.com'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="fa-solid fa-envelope" style={{ fontSize: '0.8rem' }} />
            {footerData.buttonText}
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="contact-links"
          custom={1}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ul>
            {footerData.links.map((link, i) => (
              <li key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="footer-bottom"
          custom={2}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="footer-copy">
            © {year} Hudeen. All rights reserved.
          </span>
          <span className="footer-made-with">
            Built with <span>♦</span> using React &amp; Sanity CMS
          </span>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
