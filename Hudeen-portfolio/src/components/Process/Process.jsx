import React from 'react';
import { motion } from 'framer-motion';
import './Process.css';

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Understanding your goals, users, and business challenges."
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Defining the direction, opportunities, and user experience."
  },
  {
    num: "03",
    title: "Design",
    desc: "Creating user-focused interfaces and visual systems."
  },
  {
    num: "04",
    title: "Validation",
    desc: "Testing, refining, and improving the experience."
  },
  {
    num: "05",
    title: "Delivery",
    desc: "Providing organized assets ready for development."
  }
];

function Process() {
  return (
    <section className="process-flow" id="process">
      <div className="container">
        
        <div className="flow-header">
          <h2>My Design Process</h2>
        </div>

        <div className="process-grid">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="process-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="process-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
