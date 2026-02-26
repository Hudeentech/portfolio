import { useEffect, useState } from "react";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";
import "./Exp.css";

function Exp() {
  const [wData, setWData] = useState([]);
  const [yrData, setYrData] = useState([]);

  useEffect(() => {
    const wallpaperQuery = '*[_type == "expWallpaper"]';
    const experienceQuery = '*[_type == "experienceByYear"]';

    Promise.all([client.fetch(wallpaperQuery), client.fetch(experienceQuery)])
      .then(([wallpaperData, experienceData]) => {
        const validWallpaper = wallpaperData && wallpaperData.length > 0 && wallpaperData[0].heading;

        const fallBackWData = [
          {
            wallpaper: null,
            heading: "Front-End Focus:",
            contrast1: "Crafting",
            contrast2: "Immersive Web",
            contrast3: "Experiences",
          }
        ];
        
        setWData(validWallpaper ? wallpaperData : fallBackWData);
        setYrData(experienceData || []);
      })
      .catch((error) => console.error('Exp fetch error:', error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="exp">
      <div className="exp-inner">
        {/* Banner header */}
        {wData.map((data, index) => (
          <motion.div
            key={index}
            className="exp-heading-container"
            style={{
              backgroundImage: data.wallpaper ? `url(${urlFor(data.wallpaper)?.url()})` : 'none',
            }}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h4>Experience</h4>
            <h2 className="exp-heading">
              {data.heading}{" "}
              <span className="abt-contrast">{data.contrast1}</span>{" "}
              <span className="abt-contrast">{data.contrast2}</span>{" "}
              <span className="abt-contrast">{data.contrast3}</span>
            </h2>
          </motion.div>
        ))}

        {/* Timeline */}
        <motion.div
          className="experience-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {yrData.map((yearData, index) => (
            <motion.div
              key={index}
              className="exp-component"
              variants={itemVariants}
            >
              <h3 className="year">{yearData.year}</h3>
              <div className="experience">
                <div>
                  {(yearData.skills || []).map((skill, idx) => {
                      let src;
                      try { src = urlFor(skill)?.url(); } catch { return null; }
                      if (!src) return null;
                      return (
                        <motion.img
                          key={idx}
                          src={src}
                          alt={`Skill ${idx}`}
                          whileHover={{ scale: 1.15, y: -4 }}
                          transition={{ duration: 0.25 }}
                        />
                      );
                    })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Exp;
