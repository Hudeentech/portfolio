import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import './Philosophy.css';

function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (inView && typeof value === 'number') {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.round(v) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  if (typeof value !== 'number') {
    return <h3 ref={ref}>{value}</h3>;
  }

  return <h3 ref={ref}>0{suffix}</h3>;
}

function Philosophy() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="philosophy">
      <div className="container">
        <div className="phil-inner">
          <motion.h2 
            className="phil-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            HELPING BUSINESSES TURN IDEAS INTO EXPERIENCES PEOPLE LOVE.
          </motion.h2>
          
          <motion.p 
            className="phil-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            From SaaS platforms and startup products to real estate and e-commerce brands, I design user-centered experiences that combine business goals with customer needs.
          </motion.p>

          <motion.div
            className="phil-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-item">
              <AnimatedNumber value={20} suffix="+" />
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <AnimatedNumber value={5} suffix="+" />
              <p>Industries Served</p>
            </div>
            <div className="stat-item">
              <AnimatedNumber value={100} suffix="%" />
              <p>Custom Design Approach</p>
            </div>
            <div className="stat-item">
              <AnimatedNumber value="End-to-End" />
              <p>Product Strategy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
