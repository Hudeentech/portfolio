import React, { useEffect, useState } from 'react';
import "./about-page.css"; // Import the CSS file for styling
import Nav from "../../components/Nav/Nav";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";
import { PortableText } from '@portabletext/react';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

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
          "imageUrl": imageUrl.asset->url,
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
  }, []);

  if (!aboutData) return <div className="loading"><div className="loadnav"><Nav /></div><div><h1>Loading... 🙏</h1> <p>please wait or refresh 🔃</p></div></div>;

  return (
  
    <>
    <Nav />

    <motion.div
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of container is visible
    >
      <motion.div
        className="profile-c"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img
          src={urlFor(aboutData.imageUrl)}
          alt={aboutData.name}
          className="profile-image"
        />
      </motion.div>

      <motion.div
        className="detail-card-BIO"
        variants={itemVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2>{aboutData.name}</h2>
        <PortableText value={aboutData.bio} />
      </motion.div>

      <motion.div
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
      </motion.div>

      <motion.div
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
      </motion.div>

      <motion.div
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
      </motion.div>

      <motion.div
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
      </motion.div>
    </motion.div>
    <Footer />
  </>
  );
};

export default AboutPage;