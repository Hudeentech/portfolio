import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../../components/Nav/Nav";
import "./project-page.css";
import { urlFor, client } from "../../client.js";
import Footer from "../../components/Footer/Footer";
import { PortableText } from "@portabletext/react";

function ProjectPage() {
  const [projectData, setProjectData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project for modal

  const fetchProjects = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "projectPage"]{
          _id,
          projectName,
          desc,
          imageUrl,
          github,
          demoLink,
          behance,
          tag,
          case,
          overview
        }
      `);
      setProjectData(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleClick = (tag) => {
    setSelectedTag(tag); // Update selected tag
  };

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="prj-page-container">
      <Nav />
      <div className="prj-page-title">
        <h2>My Projects</h2>

        <div className="toggel-btn">
          {["All", "web", "ui"].map((tag, index) => (
            <motion.button
              key={tag}
              className={`filter-btn ${
                selectedTag === null && tag === "All" ? "active" : ""
              } ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleClick(tag === "All" ? null : tag)}
              whileHover={{ scale: 1.1 }}
            >
              {tag === "All" ? "All Projects" : tag === "web" ? "Web Design" : "UI/UX"}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        className="prj-page-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {projectData
          .filter((data) => !selectedTag || data.tag === selectedTag)
          .map((data) => (
            <motion.div
              key={data._id}
              className="prj-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => openModal(data)} // Open modal with project details
            >
              <div className="prj-main-c">
                <h3 className="name">{data.projectName}</h3>
              </div>

              <div className="prj-main-desc">
                <p>{data.desc}</p>
              </div>

              <div className="prj-img-container">
                <img
                  src={urlFor(data.imageUrl)}
                  alt={data.projectName}
                  className="prj-p-img"
                />
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="p-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-modal-content"
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-50%", opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="p-close-modal-btn" onClick={closeModal}>
                <i className="fas fa-close"></i>
              </button>
              <h2>{selectedProject.projectName}</h2>
              <img
                src={urlFor(selectedProject.case)}
                alt={selectedProject.projectName}
                className="p-modal-img"
              />
              {selectedProject.tag === "ui" ? (
                <a
                  href={selectedProject.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-btn"
                >
                 <i className="fas fa-eye"></i> Visit Behance
                </a>
              ) : (
                <>
                  <PortableText value={selectedProject.overview} />
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-btn"
                  >
                   <i className="fas fa-globe"></i> View Live Demo
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default ProjectPage;
