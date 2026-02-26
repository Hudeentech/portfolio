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
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
          case2,
          conclusion,
          overview
        }
      `);
      setProjectData(data || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setProjectData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  /* Prevent body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const tags = [
    { key: null,  label: "All Projects" },
    { key: "web", label: "Web Dev" },
    { key: "ui",  label: "UI/UX" },
  ];

  const filtered = selectedTag
    ? projectData.filter((d) => d?.tag === selectedTag)
    : projectData;

  return (
    <div className="prj-page-container">
      <Nav />

      {/* Header  */}
      <div className="prj-page-title">
        <div className="prj-page-title-left">
          <h4>Portfolio</h4>
          <h2>My Projects</h2>
        </div>

        <div className="toggel-btn">
          {tags.map(({ key, label }) => (
            <motion.button
              key={label}
              className={`filter-btn ${selectedTag === key ? "active" : ""}`}
              onClick={() => setSelectedTag(key)}
              whileTap={{ scale: 0.96 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="prj-page-loading">
          <div className="prj-loading-dot" />
          <span>Loading projects…</span>
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <motion.div
          className="prj-page-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {filtered.length === 0 && (
            <p className="prj-page-empty">No projects found in this category yet.</p>
          )}

          {filtered.map((data) => (
            <motion.div
              key={data._id}
              className="prj-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(data)}
            >
              {/* Image */}
              {data.imageUrl && (
                <div className="prj-img-container">
                  <img
                    src={urlFor(data.imageUrl)?.url()}
                    alt={data.projectName || "Project"}
                    className="prj-p-img"
                  />
                </div>
              )}

              {/* Text */}
              <div className="prj-card-body">
                <div className="prj-main-c">
                  <h3>{data.projectName || "Untitled Project"}</h3>
                  {data.tag && (
                    <span className="prj-page-tag">
                      {data.tag === 'web' ? 'Web Dev' : 'UI/UX'}
                    </span>
                  )}
                </div>

                <div className="prj-main-desc">
                  <p>{data.desc || ""}</p>
                </div>

                <div className="prj-hint">
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                  View details
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="p-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="p-modal-content"
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="p-close-modal-btn" onClick={closeModal} aria-label="Close">
                <i className="fa-solid fa-times" />
              </button>

              <h2>{selectedProject.projectName || "Project"}</h2>
              {selectedProject.desc && <p>{selectedProject.desc}</p>}

              {/* Case image 1 — only if field exists */}
              {selectedProject.case && (
                <img
                  src={urlFor(selectedProject.case)?.url()}
                  alt="Case study"
                  className="p-modal-img"
                />
              )}

              {/* Overview portable text */}
              {selectedProject.overview && (
                <div className="p-modal-text">
                  <PortableText value={selectedProject.overview} />
                </div>
              )}

              {/* Case image 2 — only if field exists */}
              {selectedProject.case2 && (
                <img
                  src={urlFor(selectedProject.case2)?.url()}
                  alt="Case study 2"
                  className="p-modal-img"
                />
              )}

              {/* Conclusion — only if field exists */}
              {selectedProject.conclusion && (
                <div className="p-modal-text">
                  <PortableText value={selectedProject.conclusion} />
                </div>
              )}

              {/* CTA Link */}
              {selectedProject.tag === "ui" ? (
                selectedProject.behance && (
                  <a
                    href={selectedProject.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-btn"
                  >
                    <i className="fa-brands fa-behance" /> Visit Behance
                  </a>
                )
              ) : (
                selectedProject.demoLink && (
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-btn"
                  >
                    <i className="fa-solid fa-globe" /> View Live Demo
                  </a>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );

  function closeModal() { setSelectedProject(null); }
}

export default ProjectPage;
