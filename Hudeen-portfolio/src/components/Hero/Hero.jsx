import { motion } from "framer-motion";
import "../Hero/Hero.css";
import profileImg from "/src/assets/20231229_212800-removebg-preview.png";

function Hero() {
  const textVariants = {
    hidden: { y: "150%", opacity: 0, filter: 'blur(10px)' },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.15,
      },
    }),
  };

  const fadeVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: "easeOut", delay: 0.8 },
    },
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          
          <div className="hero-title">
            <h1>
              <span className="line">
                <motion.span custom={0} variants={textVariants} initial="hidden" animate="visible">
                  Designing products and brands people remember.
                </motion.span>
              </span>
            </h1>
            <motion.p 
              className="hero-subheadline"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
            >
              I help startups, businesses, and founders create digital products, brands, and experiences that attract customers, build trust, and drive growth.
            </motion.p>
            <motion.div 
              className="hero-ctas"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
            >
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="mailto:hello@example.com" className="btn-secondary">Book a Discovery Call</a>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;
