import React, { useEffect, useState } from 'react';
import "./About.css";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "aboutInfo"][0] {
            name,
            bio,
            otherInfo,
            imageUrl[] {
              asset-> { url }
            }
          }
        `);
        setAboutData(data || null);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchData();
  }, []);

  const fade = {
    hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
    visible: (i = 0) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="about-section" id="about">
      <div className="abt-hero">
        <motion.div className="detail-card-BIO" custom={0} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4>About Me</h4>
          <h2>Hi, I'm {aboutData?.name || "Deen Jordan"}.</h2>
          <h3>{aboutData?.otherInfo?.occupation || "Product Designer & Brand Strategist"}</h3>
          
          <div className="about-story">
            {aboutData?.bio ? (
              aboutData.bio.map((block, i) => {
                const text = block.children?.map(c => c.text).join('');
                return text ? <p key={i}>{text}</p> : null;
              })
            ) : (
              <>
                 <p>Over the years, I've worked on digital products, startup concepts, brand systems, and business experiences across multiple industries.</p>
                 <p>My approach combines strategy, design, and business thinking to create solutions that are both useful and impactful.</p>
              </>
            )}
          </div>
          
          <div className="about-grid">
            <div className="about-expertise" style={{ width: '100%' }}>
              <h4>Skills</h4>
              <div className="about-tags">
                {aboutData?.otherInfo?.skills ? (
                  aboutData.otherInfo.skills.map((skill, i) => (
                    <span key={i}>{skill}</span>
                  ))
                ) : (
                  <>
                     <span>Product Design</span>
                     <span>UX Strategy</span>
                     <span>UI Design</span>
                     <span>Brand Strategy</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="slideshow-container" custom={1} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}>
             {aboutData?.imageUrl?.[0] ? (
                 <img src={urlFor(aboutData.imageUrl[0])?.url()} alt="Deen Jordan" className="profile-image" />
             ) : (
                 <div className="profile-placeholder"></div>
             )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;