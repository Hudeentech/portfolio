import React, { useEffect, useState } from 'react';
import "./about-page.css"; // Import the CSS file for styling
import Nav from "../../components/Nav/Nav";
import { urlFor, client } from "../../client.js";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer/Footer";
import { PortableText } from '@portabletext/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "aboutInfo"][0] {
          name,
          bio,
          bio2,
          imageUrl[] {
            asset-> {
              url
            }
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
      setAboutData(data);
    };
  
    fetchData();
  
    // Slideshow timer
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === aboutData?.imageUrl?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
    // Cleanup function
    return () => clearInterval(timer);
  }, [aboutData?.imageUrl?.length]);

  if (!aboutData) return <div className="loading"><div className="loadnav"><Nav /></div><div><h1>Loading... 🙏</h1> <p>please wait or refresh 🔃</p></div></div>;

  return (
  
    <>
    <Nav />

    <motion.article
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of container is visible
    >
     <motion.div className="profile-c">
        <motion.div
          className="profile-c"
          variants={itemVariants}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="slideshow-container">
            <AnimatePresence mode='wait'>
              <motion.img
                key={currentIndex}
                src={urlFor(aboutData?.imageUrl[currentIndex])}
                alt={`Profile ${currentIndex + 1}`}
                className="profile-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
              />
            </AnimatePresence>
            <div className="slideshow-controls">
              <button
              className='left'
                onClick={() => setCurrentIndex(prev => prev === 0 ? aboutData?.imageUrl?.length - 1 : prev - 1)}
              >
                <i className='fas fa-chevron-left'></i>
              </button>
              <button
              className='right'
                onClick={() => setCurrentIndex(prev => prev === aboutData?.imageUrl?.length - 1 ? 0 : prev + 1)}
              >
                <i className='fas fa-chevron-right'></i>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="detail-card-BIO"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>{aboutData.name}</h2>
        <PortableText value={aboutData.bio} />
      </motion.div>

      <motion.article
        className="detail-card1"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>Personal Information</h2>
        <p>
          <b>Age:  </b> {aboutData.otherInfo.age}
        </p>
        <p>
          <b>Location:  </b> {aboutData.otherInfo.location}
        </p>
        <p>
          <b>Occupation:  </b> {aboutData.otherInfo.occupation}
        </p>
        <p>
          <b>Native Language:  </b> {aboutData.otherInfo.language}
        </p>
      </motion.article>

      <motion.article
        className="detail-card2"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>Hobbies</h2>
        <ul>
          {aboutData.otherInfo.hobbies.map((hobby) => (
            <motion.li
              key={hobby}
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {hobby}
            </motion.li>
          ))}
        </ul>
      </motion.article>

      <motion.article
        className="detail-card3"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>Skills</h2>
        <div>
          {aboutData.otherInfo.skills.map((skill) => (
            <motion.p
              className="skills"
              key={skill}
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {skill}
            </motion.p>
          ))}
        </div>
      </motion.article>

      <motion.article
        className="detail-card4"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>Experience</h2>
        <div>
          {aboutData.otherInfo.experience.map((exp) => (
            <motion.p
              key={exp}
              variants={itemVariants}
              viewport={{ once: true, amount: 0.5 }}
            >
              {exp}
            </motion.p>
          ))}
        </div>
      </motion.article>
    </motion.article>
    <Footer />
  </>
  );
};

export default AboutPage;