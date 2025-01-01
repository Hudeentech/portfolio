import { useEffect, useState } from 'react';
import { urlFor, client } from "../../client.js";
import { motion } from 'framer-motion'; // Import motion from framer-motion
import './Services.css';
import img from '/src/assets/Mask group.png'

function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "service"]';
    client.fetch(query)
      .then((data) => setData(data));
  }, []);

  // Variants for fade-in animation with transition effects
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 }, // Starts off below with opacity 0
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: 'easeOut',
        delay: 0.3,  // Delay to create the stagger effect
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.3, // Stagger the children with 0.3s delay
        delayChildren: 0.5, // Delay before children start animating
      }
    }
  };

  return (
    <motion.div
    id='services'
      className='svc'
      initial="hidden"
      animate="visible"
      variants={containerVariants} // Apply container variants
    >
      <img src={img} alt="" className="patterns" />
      <motion.h4> What I Do </motion.h4>

      <motion.div
        className="svc-container"
        variants={fadeInVariants} // Apply individual fadeIn effect
        initial="hidden"
        whileInView="visible"
      >
        <motion.h2>
          With extensive <span className="abt-contrast">experience</span> in <span className="abt-contrast">interactive design</span>, I've collaborated with end organizations
        </motion.h2>
      </motion.div>

      <motion.div
        className="svc-card-container"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants} // Apply container animation for stagger effect
      >
        {data.map((data, index) => (
          <motion.div
            key={index}
            className="svc-card"
            variants={fadeInVariants} // Apply fadeIn effect to each card
            transition={{ delay: 0.5 + index * 0.2 }} // Stagger each card
          >
            <motion.img src={urlFor(data.icon)} alt="" />
            <motion.h4>{data.heading}</motion.h4>
            <motion.p>{data.summary}</motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Services;
