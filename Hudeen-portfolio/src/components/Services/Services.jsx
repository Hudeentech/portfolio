import { useEffect, useState } from 'react';
import { client } from "../../client.js";
import { motion } from 'framer-motion';
import './Services.css';

const FALLBACK_SERVICES = [
  {
    heading: "Product Design",
    summary: "Designing intuitive digital products that users enjoy and businesses can scale.",
    capsules: ["UX Strategy", "User Research", "Wireframes", "UI Design", "Design Systems", "Prototyping"]
  },
  {
    heading: "Brand Strategy",
    summary: "Building brands that stand out and connect with the right audience.",
    capsules: ["Brand Positioning", "Brand Identity", "Visual Direction", "Messaging", "Content Strategy"]
  },
  {
    heading: "Landing Page Design",
    summary: "High-converting landing pages built to drive leads, sales, and engagement.",
    capsules: ["Conversion Strategy", "Wireframes", "Copy Direction", "Responsive Design"]
  }
];

function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "service"]')
      .then((d) => {
        setData(d && d.length > 0 ? d : FALLBACK_SERVICES);
      })
      .catch((err) => {
        console.error('Services fetch error:', err);
        setData(FALLBACK_SERVICES);
      });
  }, []);

  // Calculate slide direction based on index to animate from "all sides"
  const getInitialAnimation = (index) => {
    const directions = [
      { x: -100, y: 0 }, // left
      { x: 100, y: 0 },  // right
      { x: 0, y: 100 },  // bottom
    ];
    return directions[index % directions.length];
  };

  return (
    <section className="services-flow" id="capabilities">
      <div className="container">
        
        <motion.div 
          className="flow-header"
          initial={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2>How I Can Help</h2>
        </motion.div>

        <div className="services-card-grid">
          {data.map((item, index) => {
            const initialPos = getInitialAnimation(index);
            return (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, filter: 'blur(10px)', ...initialPos }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="service-number">0{index + 1}</div>
                <div className="service-content">
                  <h3>{item.heading}</h3>
                  <p>{item.summary}</p>
                  
                  <div className="service-capsules">
                    {(item.capsules || ["UI Design", "Strategy", "Execution"]).map((cap, i) => (
                      <span key={i} className="service-capsule">{cap}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

export default Services;
