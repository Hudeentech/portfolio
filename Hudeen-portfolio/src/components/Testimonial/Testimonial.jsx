import React from "react";
import { motion } from "framer-motion";
import "./Testimonial.css";
import Marquee from 'react-fast-marquee';

function Testimonial() {
  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Stagger effect for children
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      className="testimonial"
    >
      <motion.div 
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      className="tst-title"
      >
      <motion.h4>Testimonial</motion.h4>
      <motion.h2>
        I've <span className="abt-contrast">collaborated</span> with
        innovative teams and{" "}
        <span className="abt-contrast">industry professionals</span> on the
        development of their cutting-edge products.
      </motion.h2>
      </motion.div>

      <motion.div
      className="tst-c-container"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      >
      <Marquee 
        speed={100}
        gradient={false}
        pa
        pauseOnHover={true}
        className="tst-marquee"
      >
        {Array(3)
        .fill({
          name: "Hamzah Danesi",
          title: "Director of Design | ACE",
          image: "/src/assets/Ellipse 123.jpg",
          feedback:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nulla excepturi a iste quis id. Vero fugit sunt perspiciatis repudiandae repellendus laborum, fuga harum cumque quae sed earum molestias illo.",
        })
        .map((testimonial, index) => (
          <motion.div key={index} className="tst" variants={cardVariants}>
          <div className="tst-img">
            <img src={testimonial.image} alt={testimonial.name} />
            <div>
            <h3>{testimonial.name}</h3>
            <i>{testimonial.title}</i>
            </div>
          </div>
          <div className="tst-w">
            <p>{testimonial.feedback}</p>
          </div>
          </motion.div>
        ))}
      </Marquee>
      </motion.div>
    </motion.div>
    );
}

export default Testimonial;
