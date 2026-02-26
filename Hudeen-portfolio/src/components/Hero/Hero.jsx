import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../client.js";
import "../Hero/Hero.css";

function Hero() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "hero"]';
    client.fetch(query)
      .then((d) => setData(d || []))
      .catch((err) => console.error('Hero fetch error:', err));
  }, []);

  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  // Don't crash — just render nothing while loading or if CMS is empty
  if (data.length === 0) return null;

  const item = data[0];
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <section className="hero-wrapper">
      <div className="hero-bg" />

      <div className="hero-container">
        {/* ── Issue line ── */}
        <motion.div className="hero-issue" custom={0} variants={fade} initial="hidden" animate="visible">
          <span className="hero-issue-dot" />
          <span>Portfolio — {today}</span>
          <span>Web Dev &amp; UI Design</span>
          <span style={{ marginLeft: 'auto' }}>Est. 2021</span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div custom={1} variants={fade} initial="hidden" animate="visible">
          <span className="hero-salutation">{item.headingSalutation}</span>
          <h1 className="hero-heading">
            {(item.name || '').split(' ')[0]}&nbsp;
            <em>{(item.name || '').split(' ').slice(1).join(' ')}</em>
          </h1>
        </motion.div>

        {/* ── Bottom editorial row ── */}
        <motion.div className="hero-bottom" custom={2} variants={fade} initial="hidden" animate="visible">
          {/* Left: description + CTAs */}
          <div className="hero-desc">
            <p>{item.summary}</p>
            <div className="hero-actions">
              <a href="#projects" className="hero-btn-primary">
                View Work
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }} />
              </a>
              <a href="#contact" className="hero-btn-outline">
                Get in Touch
              </a>
            </div>

            {/* Stats inline */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">3+</div>
                <div className="hero-stat-label">Years</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">20+</div>
                <div className="hero-stat-label">Projects</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">∞</div>
                <div className="hero-stat-label">Coffee</div>
              </div>
            </div>
          </div>

          {/* Right: social icons column */}
          <div className="hero-socials-col">
            <div className="social-icons">
              {(item.socialMedia || []).map((social, idx) => (
                social?.url && social?.platform ? (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  <i className={`fa-brands fa-${social.platform.toLowerCase()}`} />
                </motion.a>
                ) : null
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
