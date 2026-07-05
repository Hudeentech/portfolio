import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonial.css";

const FALLBACK = [
  {
    id: "fb1",
    name: "Client",
    role: "Startup Founder",
    message: "Working with Deen transformed our product experience. The attention to detail and strategic thinking helped us launch with confidence.",
  },
  {
    id: "fb2",
    name: "Client",
    role: "Product Lead",
    message: "Beyond design, we gained clarity on our product direction and customer journey.",
  }
];

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulated fetch
    setTestimonials(FALLBACK);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="testimonial-fader" id="testimonials">
      <div className="container">
        
        <div className="flow-header" style={{ marginBottom: "4rem" }}>
          <h2>What Clients Say</h2>
        </div>

        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="testimonial-active"
            >
              <div className="quote-mark">"</div>
              <p className="t-quote">{current.message}</p>
              <div className="t-author">
                <span className="t-name">{current.name}</span>
                <span className="t-role">{current.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonial;
