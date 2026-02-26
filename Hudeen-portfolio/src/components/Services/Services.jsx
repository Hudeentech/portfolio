import { useEffect, useState } from 'react';
import { urlFor, client } from "../../client.js";
import { motion } from 'framer-motion';
import './Services.css';

function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "service"]')
      .then((d) => setData(d || []))
      .catch((err) => console.error('Services fetch error:', err));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="svc" id="services">
      <div className="svc-inner">

        {/* Header */}
        <div className="svc-header">
          <div className="svc-header-left">
            <motion.h4
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What I Do
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              viewport={{ once: true }}
            >
              Empowering<br />Solutions
            </motion.h2>
          </div>

          <div className="svc-header-right">
            <p className="svc-intro-text">
              From pixel-perfect interfaces to scalable full-stack builds —
              I turn complex problems into elegant digital experiences.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="svc-card-container">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="svc-card"
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="svc-card-num">0{index + 1}</div>
              {item.icon && (
                <div className="svc-card-icon">
                  <img src={urlFor(item.icon)?.url()} alt="" />
                </div>
              )}
              <h4>{item.heading}</h4>
              <p>{item.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
