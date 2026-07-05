import React, { useState, useEffect } from "react";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Projects.css";

const ProjectCard = ({ data, index, onClick }) => {
  const bgColor = data.bgColor || '#1A1A1A'; // Plain sleek dark color by default

  return (
    <motion.div
      className="project-showcase-card"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(data)}
    >
      <div className="card-left">
        <div className="card-left-top">
          <h3>{data.projectName || 'Untitled'}</h3>
          {data.tag && <span className="card-tag">{data.tag}</span>}
          <p className="card-summary">
            {data.projectSummary || "Delivering high-impact design and engineering solutions that drive user engagement and business value."}
          </p>
        </div>
        <div className="card-cta">
          <span>See more</span>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>

      <div className="card-right">
        {data.images ? (
          <img
            src={urlFor(data.images)?.url()}
            alt={data.projectName || 'Project'}
            className="card-image"
          />
        ) : (
          <div className="card-image-placeholder"></div>
        )}
      </div>
    </motion.div>
  );
};

function Projects() {
  const [projectData, setProjectData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    client.fetch('*[_type == "projects"]')
      .then((data) => setProjectData(data || []))
      .catch((err) => console.error('Projects fetch error:', err));
  }, []);

  return (
    <section className="projects-flow" id="projects">
      <div className="container">
        
        <div className="flow-header">
          <h2>Selected Work</h2>
          <p className="flow-sub">A collection of projects focused on solving business problems through thoughtful design and strategy.</p>
        </div>

        <div className="projects-stack">
          {projectData.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Loading projects...
            </div>
          )}

          {projectData.map((data, index) => (
            <ProjectCard 
              key={data._id || index}
              data={data} 
              index={index} 
              onClick={(proj) => {
                navigate(`/project/${proj._id}`, { state: { project: proj, index: index } });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
