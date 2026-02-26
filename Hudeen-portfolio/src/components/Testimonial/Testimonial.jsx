import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Testimonial.css";
import Marquee from 'react-fast-marquee';

/* Fallback in case the API has a CORS error or is down */
const FALLBACK = [
  {
    id: "fb1",
    name: "Sirius Deen",
    role: "CEO",
    company: "Starz Real Estates Agency",
    pictureUrl: "https://res.cloudinary.com/djk0xb5gg/image/upload/v1755633184/testimonial_pictures/8550b015-e74d-43b1-a618-741477cc9e59.jpg",
    message: "Really appreciate your work, the design and setup is spot on. The company website you help me build is fully operational...",
    rating: 5,
  },
  {
    id: "fb2",
    name: "austine mathias",
    role: "Senior web developer",
    company: "IGenie",
    pictureUrl: "https://res.cloudinary.com/djk0xb5gg/image/upload/v1755170208/testimonial_pictures/8c1d5da3-0aad-43a2-b790-c66be044d1f1.png",
    message: "Working with this agency is just a dream come true, very observant and meticulous about every prelocess of our work...",
    rating: 5,
  },
  {
    id: "fb3",
    name: "Oluwafemi Destiny",
    role: "UI designer",
    company: "Pico Digital",
    pictureUrl: "https://res.cloudinary.com/djk0xb5gg/image/upload/v1755158055/testimonial_pictures/4cd96b2e-04af-4c69-9869-7abc43d1dfaa.jpg",
    message: "Hudeen was a different kind of partner. I've worked with other designers and clients, but his intelligence and drive helped our team stay strong...",
    rating: 5,
  },
  {
    id: "fb4",
    name: "Alex Chen",
    role: "Product Manager",
    company: "Craft Technologies",
    pictureUrl: "https://res.cloudinary.com/djk0xb5gg/image/upload/v1755094037/testimonial_pictures/5e89f994-6777-4557-add4-f35588458c03.jpg",
    message: "Working with Hudeen on our new platform was a fantastic experience. They didn't just deliver a beautiful user interface...",
    rating: 5,
  },
];

function TestimonialCard({ t }) {
  // Use rating from API if available, otherwise default to 5
  const stars = Math.min(5, Math.max(1, t.rating || 5));
  const imgSrc = t.pictureUrl || null;
  const title = t.role && t.company ? `${t.role} · ${t.company}` : (t.role || t.company || "");

  return (
    <div className="tst">
      {/* Author */}
      <div className="tst-img">
        {imgSrc ? (
          <img src={imgSrc} alt={t.name} loading="lazy" />
        ) : (
          <div className="tst-avatar-placeholder">
            {t.name?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}
        <div>
          <h3>{t.name}</h3>
          <i>{title}</i>
        </div>
      </div>

      {/* Stars */}
      <div className="tst-stars">
        {[...Array(stars)].map((_, i) => <span key={i}>★</span>)}
        {[...Array(5 - stars)].map((_, i) => (
          <span key={`e${i}`} style={{ opacity: 0.2 }}>★</span>
        ))}
      </div>

      <div className="tst-divider" />

      <div className="tst-w">
        <p>"{t.message}"</p>
      </div>
    </div>
  );
}

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [apiStatus, setApiStatus] = useState('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hudeen-review.vercel.app/api/testimonials/approved')
      .then((res) => {
        if (!res.ok) throw new Error('API Response not ok');
        return res.json();
      })
      .then((data) => {
        setApiStatus('success');
        setTestimonials(data?.length ? data : FALLBACK);
      })
      .catch((err) => {
        console.error('Testimonial API CORS/Network Error:', err);
        setApiStatus('error');
        setTestimonials(FALLBACK);
      })
      .finally(() => setLoading(false));
  }, []);

  /* Duplicate for infinite marquee effect */
  const cards = loading ? FALLBACK : testimonials;
  const doubled = [...cards, ...cards];

  return (
    <section className="testimonial">
      <div className="tst-inner">
        {/* Header */}
        <motion.div
          className="tst-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Testimonials
              {!loading && (
                <span style={{ 
                  display: 'inline-block', 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: apiStatus === 'success' ? '#4ade80' : '#ef4444' 
                }} title={apiStatus === 'success' ? "Live API Connected" : "API Offline / CORS Error"} />
              )}
            </h4>
            <h2>
              What Clients<br />Are Saying
            </h2>
          </div>
          <p className="tst-intro">
            I take pride in building lasting partnerships.
            Here's what some of my clients have to say.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="tst-c-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Marquee speed={36} gradient={false} pauseOnHover>
            {doubled.map((t, i) => (
              <TestimonialCard key={t.id + i} t={t} />
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonial;
