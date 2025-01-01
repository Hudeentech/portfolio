import React, { useState, useEffect } from "react";
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion"; // Import motion from framer-motion

import "./Projects.css";

function Projects({ blog, onClick }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [showArticle, setShowArticle] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const query = '*[_type == "projects"]';
    client.fetch(query).then((data) => setProjectData(data));
  }, []);

  const handleClick = (tag) => {
    setSelectedTag(tag);
  };

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // Stagger effect for children
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.2, ease: "easeOut" }, // Delay each button
    }),
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="prj-c">
      {/* Title Animation */}
      <motion.div
      className="prj-title"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      >
      <motion.h4 variants={titleVariants}>My projects</motion.h4>
      <motion.h2 variants={titleVariants}>
        Exploring the Digital Canvas:
        <span className="abt-contrast"> My Portfolio</span> Showcase
      </motion.h2>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
      className="toggel-btn"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      >
      {["All", "web", "ui"].map((tag, index) => (
        <motion.button
        key={tag}
        className={`filter-btn ${
          selectedTag === null && tag === "All" ? "active" : ""
        } ${selectedTag === tag ? "active" : ""}`}
        onClick={() => handleClick(tag === "All" ? null : tag)}
        custom={index}
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        >
        {tag === "All" ? "All" : tag === "web" ? "Web Design" : "UI/UX"}
        </motion.button>
      ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div
      className="prj-grid"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      >
      {projectData
        .filter((data) => !selectedTag || data.tag === selectedTag)
        .map((data, index) => (
        <motion.div
          key={data.projectName + index}
          className="prj-b"
          variants={projectCardVariants}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
          setSelectedProject(data);
          setShowArticle(true);
          }}
        >
          <div className="img-container">
          <img src={urlFor(data.images)} alt="img" className="prj-img" />
          </div>

          <motion.div className="prj-content-container">
          <div className="prj-main-c">
            <h3 className="name">{data.projectName}</h3>
            <p>{data.desc}</p>
          </div>
          </motion.div>
        </motion.div>
        ))}
      </motion.div>

      {/* Project Details Modal */}
      {showArticle && selectedProject && (
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowArticle(false)}
      >
        <motion.div 
        className="modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        >
        <button 
          className="modal-close"
          onClick={() => setShowArticle(false)}
        >
          ×
        </button>
        <img 
          src={urlFor(selectedProject.images)} 
          alt={selectedProject.projectName} 
          className="modal-image"
        />
       <div className="modal-text-container">
       <h2>{selectedProject.projectName}</h2>
        <p>{selectedProject.overview}</p>
        <div className="modal-links">
          <a 
          href={selectedProject.liveDemo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="demo-link"
          >
          View Live Demo
          </a>
        </div>
       </div>
        </motion.div>
      </motion.div>
      )}
    </div>
    );
}

export default Projects;
