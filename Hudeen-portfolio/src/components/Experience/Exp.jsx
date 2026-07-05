import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "../../client.js";
import "./Exp.css";

const EXPERIENCE_DATA = [
  {
    role: "Senior Product Designer",
    company: "TechNova",
    date: "2024 - Present",
    description: "Leading the product design for enterprise platforms. Focused on driving growth through intuitive user experiences, scalable design systems, and cross-functional strategy."
  },
  {
    role: "UX/UI Designer",
    company: "Studio Elevate",
    date: "2021 - 2024",
    description: "Designed high-converting landing pages and web applications for startups. Collaborated with founders to translate business goals into pixel-perfect interfaces."
  },
  {
    role: "Freelance Designer",
    company: "Self-Employed",
    date: "2019 - 2021",
    description: "Partnered with early-stage startups to establish their brand identity and digital presence. Delivered end-to-end design and frontend development solutions."
  }
];

function Exp() {
  const [data, setData] = useState(EXPERIENCE_DATA);

  useEffect(() => {
    client.fetch('*[_type == "aboutInfo"]')
      .then((res) => {
        if (res && res.length > 0) {
          const aboutData = res[0];
          if (aboutData?.otherInfo?.experience) {
            const expBlocks = aboutData.otherInfo.experience;
            const parsedData = [];
            let current = null;
            
            expBlocks.forEach(block => {
              if (block.style === 'h2') {
                if (current) parsedData.push(current);
                const roleText = block.children?.map(c => c.text).join('') || '';
                current = { role: roleText, company: '', date: '', description: '' };
              } else if (block.style === 'normal' && !block.listItem && current) {
                const c = block.children?.find(ch => ch.marks && ch.marks.includes('strong'));
                if (c) current.company = c.text;
                
                const d = block.children?.find(ch => ch.marks && ch.marks.includes('em'));
                if (d) current.date = d.text;
              } else if (block.listItem === 'bullet' && current) {
                const text = block.children?.map(ch => ch.text).join('') || '';
                current.description += (current.description ? '\n' : '') + text;
              }
            });
            if (current) parsedData.push(current);
            
            if (parsedData.length > 0) {
              setData(parsedData);
            }
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="experience-flow" id="experience">
      <div className="container">
        
        <motion.div 
          className="flow-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <h2>Experience</h2>
        </motion.div>

        <motion.div 
          className="exp-group-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {data.map((job, index) => {
            return (
              <div 
                key={index} 
                className="exp-row"
              >
                <div className="exp-header">
                  <span className="exp-date">{job.date}</span>
                  <h3 className="exp-role">{job.role}</h3>
                  <span className="exp-company">{job.company}</span>
                </div>
                
                <div className="exp-content">
                  {job.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Exp;
