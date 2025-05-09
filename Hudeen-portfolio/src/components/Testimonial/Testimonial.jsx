import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Testimonial.css";
import Marquee from 'react-fast-marquee';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://testimonial-system.vercel.app';

const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/testimonials`);
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        toast.error('Could not load testimonials. Please try again later.');
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="testimonial">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="tst-loading"
        >
          Loading testimonials...
        </motion.div>
      </div>
    );
  }

  // Split testimonials into two arrays for the two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const firstRowTestimonials = testimonials.slice(0, midPoint);
  const secondRowTestimonials = testimonials.slice(midPoint);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="testimonial"
    >
      <motion.div 
        variants={itemVariants}
        className="tst-title"
      >
        <h4>Testimonials</h4>
        <h2>What People Say About My Work</h2>
      </motion.div>

      <motion.div
        className="tst-c-container"
        variants={containerVariants}
      >
        {/* First row - moving right */}
        <div className="marquee-row">
          <Marquee 
            speed={isMobile ? 30 : 40}
            gradient={false}
            pauseOnHover={true}
            direction="left"
          >
            {firstRowTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id || `row1-${index}`}
                className="tst"
                variants={itemVariants}
              >
                <div className="tst-img">
                  <img 
                    src={testimonial.image ? `${testimonial.image}` : '/default-avatar.png'} 
                    alt={`${testimonial.name}'s profile`}
                    loading="lazy"
                  />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <i>{testimonial.company} • {testimonial.jobTitle}</i>
                  </div>
                </div>
                <div className="tst-w">
                  <p>{testimonial.message}</p>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>

        {/* Second row - moving left */}
        <div className="marquee-row">
          <Marquee 
            speed={isMobile ? 30 : 40}
            gradient={false}
            pauseOnHover={true}
            direction="right"
          >
            {secondRowTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id || `row2-${index}`}
                className="tst"
                variants={itemVariants}
              >
                <div className="tst-img">
                  <img 
                    src={testimonial.image ? `${testimonial.image}` : '/default-avatar.png'} 
                    alt={`${testimonial.name}'s profile`}
                    loading="lazy"
                  />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <i>{testimonial.company} • {testimonial.jobTitle}</i>
                  </div>
                </div>
                <div className="tst-w">
                  <p>{testimonial.message}</p>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Testimonial;
