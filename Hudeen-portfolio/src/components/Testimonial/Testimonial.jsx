import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonial.css";

// Define your backend URL.
const BACKEND_URL = 'https://hudeen-backend.vercel.app'; // Keep this URL for deployment

const AUTOPLAY_INTERVAL = 7000; // Auto-change testimonial every 7 seconds

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
  const [selectedTestimonial, setSelectedTestimonial] = useState(null); // State for the currently displayed full testimonial
  const [autoSelectIndex, setAutoSelectIndex] = useState(0); // State to track the index for auto-selection

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
        if (data.length > 0) {
          setSelectedTestimonial(data[0]); // Select the first testimonial by default
          setAutoSelectIndex(0); // Initialize auto-selection index
        }
      } catch (error) {
        console.error('Could not load testimonials. Please try again later.', error);
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Handler for manual selection
  const handleSelectTestimonial = useCallback((testimonial, index) => {
    setSelectedTestimonial(testimonial);
    setAutoSelectIndex(index); // Reset auto-selection to the manually selected index
  }, []);

  // Effect for automatic testimonial selection
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setAutoSelectIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % testimonials.length;
          setSelectedTestimonial(testimonials[nextIndex]); // Update selected testimonial
          return nextIndex;
        });
      }, AUTOPLAY_INTERVAL);

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [testimonials, setSelectedTestimonial, AUTOPLAY_INTERVAL]); // Re-run if testimonials or interval changes

  // Framer Motion variants for the main testimonial content (right panel)
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  if (isLoading) {
    return (
      <section className="testimonial-section">
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

      <div className="tst-main-content-area">
        <div className="tst-names-list-panel">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`tst-name-card ${selectedTestimonial && selectedTestimonial.id === testimonial.id ? 'selected' : ''}`}
                onClick={() => handleSelectTestimonial(testimonial, index)} // Pass index here
                whileHover={{ scale: 1.02, backgroundColor: 'var(--color-card-hover)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="tst-name-card-img-wrap">
                  <img
                    src={testimonial.pictureUrl || 'https://placehold.co/48x48/1c1c1c/white?text=No+Img'}
                    alt={`${testimonial.name}'s profile`}
                    className="tst-name-card-img"
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/48x48/1c1c1c/white?text=No+Img'; }}
                  />
                </div>
                <div className="tst-name-card-info">
                  <span className="tst-name-card-name">{testimonial.name}</span>
                  {(testimonial.role || testimonial.company) && (
                    <span className="tst-name-card-job">{`${testimonial.role || ''}${testimonial.role && testimonial.company ? ', ' : ''}${testimonial.company || ''}`}</span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="tst-no-data-small">No testimonials available.</div>
          )}
        </div>

        <div className="tst-full-display-panel">
          {selectedTestimonial ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTestimonial.id}
                className="tst-full-testimonial-content"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="tst-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-icon">&#9733;</span>
                  ))}
                </div>
                <p className="tst-full-message">"{selectedTestimonial.message}"</p>

                <div className="tst-full-meta">
                  <div className="tst-full-meta-left">
                    <img
                      src={selectedTestimonial.pictureUrl || 'https://placehold.co/60x60/1c1c1c/white?text=No+Img'}
                      alt={`${selectedTestimonial.name}'s profile`}
                      className="tst-full-img"
                      loading="lazy"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/1c1c1c/white?text=No+Img'; }}
                    />
                    <div className="tst-full-info">
                      <span className="tst-full-name">{selectedTestimonial.name}</span>
                      {(selectedTestimonial.role || selectedTestimonial.company) && (
                        <span className="tst-full-job">{`${selectedTestimonial.role || ''}${selectedTestimonial.role && selectedTestimonial.company ? ' at ' : ''}${selectedTestimonial.company || ''}`}</span>
                      )}
                    </div>
                  </div>
                  <span className="tst-full-date">{selectedTestimonial.submissionDate
                    ? new Date(selectedTestimonial.submissionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })
                    : 'N/A'}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="tst-no-data-full">Select a testimonial from the left to view details.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
