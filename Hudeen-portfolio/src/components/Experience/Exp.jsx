import { useEffect, useState } from "react";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";

import "./Exp.css";

function Exp() {
  const [expData, setExpData] = useState([]);
  const [wData, setWData] = useState([]);
  const [yrData, setYrData] = useState([]);

  useEffect(() => {
    const wallpaperQuery = '*[_type == "expWallpaper"]';
    const experienceQuery = '*[_type == "experienceByYear"]';

    Promise.all([client.fetch(wallpaperQuery), client.fetch(experienceQuery)])
      .then(([wallpaperData, experienceData]) => {
        setWData(wallpaperData);
        setYrData(experienceData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div className="exp">
      {wData.map((data, index) => (
        <motion.div
          key={index}
          style={{ backgroundImage: `url(${urlFor(data.wallpaper)})` }}
          className="exp-heading-container"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Trigger animation when 50% of the element is in view
        >
          <h4>Experience</h4>
          <h2 className="exp-heading">
            {data.heading}{" "}
            <motion.span
              className="abt-contrast"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data.contrast1}
            </motion.span>{" "}
            <motion.span
              className="abt-contrast"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data.contrast2}
            </motion.span>{" "}
            <motion.span
              className="abt-contrast"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {data.contrast3}
            </motion.span>
          </h2>
        </motion.div>
      ))}

      <motion.div
        className="experience-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the container is in view
      >
        {yrData.map((yearData, index) => (
          <motion.div
            key={index}
            className="exp-component"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="year">{yearData.year}</h3>
            <motion.div
              className="experience"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                {yearData.skills.map((skill, idx) => (
                  <motion.img
                    key={idx}
                    src={urlFor(skill).url()}
                    alt={`Skill ${idx}`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Exp;
