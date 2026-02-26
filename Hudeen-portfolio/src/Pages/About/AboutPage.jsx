import React, { useEffect, useState } from 'react';
import "./about-page.css";
import Nav from "../../components/Nav/Nav";
import { urlFor, client } from "../../client.js";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer/Footer";
import { PortableText } from '@portabletext/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "aboutInfo"][0] {
            name,
            bio,
            bio2,
            imageUrl[] {
              asset-> { url }
            },
            otherInfo {
              age,
              location,
              occupation,
              hobbies,
              skills,
              experience,
              language,
            }
          }
        `);
        setAboutData(data || null);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Slideshow timer — only runs when we have images
  useEffect(() => {
    const imageCount = aboutData?.imageUrl?.length ?? 0;
    if (imageCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, 5000);

    return () => clearInterval(timer);
  }, [aboutData?.imageUrl?.length]);

  const imageCount = aboutData?.imageUrl?.length ?? 0;

  if (loading) {
    return (
      <div className="abt-loading">
        <Nav />
        <div className="abt-loading-body">
          <div className="prj-loading-dot" />
          <span>Loading profile…</span>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="abt-loading">
        <Nav />
        <div className="abt-loading-body" style={{ flexDirection: 'column', gap: '0.5rem' }}>
          <span>Profile not available yet.</span>
          <small>Add data in Sanity Studio to see it here.</small>
        </div>
      </div>
    );
  }

  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      <Nav />
      <main className="about-page-main">

        {/* ── Hero row ── */}
        <section className="abt-hero">
          {/* Slideshow / Profile image */}
          {imageCount > 0 && (
            <motion.div className="slideshow-container" custom={0} variants={fade} initial="hidden" animate="visible">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={urlFor(aboutData.imageUrl[currentIndex])?.url()}
                  alt={`Profile ${currentIndex + 1}`}
                  className="profile-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {imageCount > 1 && (
                <>
                  <button
                    className="slide-btn left"
                    onClick={() => setCurrentIndex((p) => (p === 0 ? imageCount - 1 : p - 1))}
                    aria-label="Previous"
                  >
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button
                    className="slide-btn right"
                    onClick={() => setCurrentIndex((p) => (p + 1) % imageCount)}
                    aria-label="Next"
                  >
                    <i className="fas fa-chevron-right" />
                  </button>

                  {/* Dot indicators */}
                  <div className="slide-dots">
                    {aboutData.imageUrl.map((_, i) => (
                      <button
                        key={i}
                        className={`slide-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Bio */}
          <motion.div className="detail-card-BIO" custom={1} variants={fade} initial="hidden" animate="visible">
            <h4>About Me</h4>
            {aboutData.name && <h2>{aboutData.name}</h2>}
            {aboutData.bio && <PortableText value={aboutData.bio} />}
          </motion.div>
        </section>

        {/* ── Info grid ── */}
        <section className="abt-info-grid">

          {/* Personal info */}
          {aboutData.otherInfo && (
            <motion.article className="detail-card1" custom={2} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3>Personal Info</h3>
              {aboutData.otherInfo.age && <p><span>Age</span>{aboutData.otherInfo.age}</p>}
              {aboutData.otherInfo.location && <p><span>Location</span>{aboutData.otherInfo.location}</p>}
              {aboutData.otherInfo.occupation && <p><span>Occupation</span>{aboutData.otherInfo.occupation}</p>}
              {aboutData.otherInfo.language && <p><span>Language</span>{aboutData.otherInfo.language}</p>}
            </motion.article>
          )}

          {/* Hobbies */}
          {aboutData.otherInfo?.hobbies?.length > 0 && (
            <motion.article className="detail-card2" custom={3} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3>Hobbies</h3>
              <ul>
                {aboutData.otherInfo.hobbies.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </motion.article>
          )}

          {/* Skills */}
          {aboutData.otherInfo?.skills?.length > 0 && (
            <motion.article className="detail-card3" custom={4} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3>Skills</h3>
              <div className="skills-list">
                {aboutData.otherInfo.skills.map((s, i) => (
                  <span key={i} className="skill-chip">{s}</span>
                ))}
              </div>
            </motion.article>
          )}

          {/* Experience */}
          {aboutData.otherInfo?.experience && (
            <motion.article className="detail-card4" custom={5} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3>Experience</h3>
              <PortableText value={aboutData.otherInfo.experience} />
            </motion.article>
          )}

          {/* Bio 2 */}
          {aboutData.bio2 && (
            <motion.article className="detail-card-bio2" custom={6} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <PortableText value={aboutData.bio2} />
            </motion.article>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;