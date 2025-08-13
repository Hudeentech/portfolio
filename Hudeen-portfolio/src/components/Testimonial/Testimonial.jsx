import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for exit animations
import "./Testimonial.css";
// import Marquee from 'react-fast-marquee'; // No longer needed for slider functionality
// import { toast } from 'react-toastify'; // REMOVED: toast import

// Define your backend URL.
// IMPORTANT: You MUST change this to your deployed backend URL (e.g., 'https://your-backend-api.vercel.app')
// after you deploy your Node.js server.
const BACKEND_URL = 'https://hudeen-review.vercel.app'; // Keep this URL for deployment

const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/testimonials/approved`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch testimonials' }));
      throw new Error(errorData.message || 'Failed to fetch testimonials');
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
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current testimonial
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Could not load testimonials. Please try again later.', error); // Changed toast to console.error
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Function to go to the next testimonial
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous testimonial
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Autoplay functionality (optional, can be removed if not desired)
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [testimonials, nextSlide]); // Added nextSlide to dependency array to avoid stale closure warning

  // Framer Motion variants for slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: "0%",
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute" // Important for smooth exit and entry
    })
  };

  if (isLoading) {
    return (
      <section className="testimonial-section"> {/* Changed class to avoid conflict with old Testimonial.css */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="tst-loading"
          style={{ textAlign: 'center', padding: '20px', color: 'gold' }}
        >
          Loading testimonials...
        </motion.div>
      </section>
    );
  }

  return (
    <section className="testimonial-section">
      <div className="tst-title">
        <h4>Testimonials</h4>
        <h2>What People Say About My Work</h2>
      </div>

      <div className="tst-slider-container">
        {testimonials.length > 0 ? (
          <>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex} // Key changes to re-mount component for animation
                className="tst-card-wrapper"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {testimonials[currentIndex] && (
                  <div className="tst-card">
                    <div className="tst-card-img-wrap">
                      <img
                        src={testimonials[currentIndex].pictureUrl || 'https://placehold.co/60x60/1c1c1c/white?text=No+Img'}
                        alt={`${testimonials[currentIndex].name}'s profile`}
                        className="tst-card-img"
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/1c1c1c/white?text=No+Img'; }}
                      />
                    </div>
                    <div className="tst-card-content">
                      <p className="tst-card-message">"{testimonials[currentIndex].message}"</p>
                      <div className="tst-card-meta">
                        <span className="tst-card-name">{testimonials[currentIndex].name}</span>
                        {(testimonials[currentIndex].company || testimonials[currentIndex].jobTitle) && (
                          <span className="tst-card-job">
                            {testimonials[currentIndex].company && `${testimonials[currentIndex].company}`}
                            {testimonials[currentIndex].company && testimonials[currentIndex].jobTitle && ` • `}
                            {testimonials[currentIndex].jobTitle && `${testimonials[currentIndex].jobTitle}`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && ( // Only show buttons if more than one testimonial
              <div className="tst-slider-nav">
                <button onClick={prevSlide} className="tst-nav-button prev">
                  &#8249; {/* Left arrow */}
                </button>
                <button onClick={nextSlide} className="tst-nav-button next">
                  &#8250; {/* Right arrow */}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="tst-no-data" style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
            <p>No testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonial;
