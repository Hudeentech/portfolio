import React, { useState, useEffect } from "react";
import { urlFor, client } from "../../client.js";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import "./Projects.css";

function Projects() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [showArticle, setShowArticle] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "projects"]')
      .then((data) => setProjectData(data || []))
      .catch((err) => console.error('Projects fetch error:', err));
  }, []);

  useEffect(() => {
    document.body.style.overflow = showArticle ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showArticle]);

  const tags = [
    { key: null,  label: "All" },
    { key: "web", label: "Web Dev" },
    { key: "ui",  label: "UI/UX" },
  ];

  const filtered = selectedTag
    ? projectData.filter((d) => d?.tag === selectedTag)
    : projectData;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="prj-c" id="projects">
      <div className="prj-inner">

        {/* ── Header ── */}
        <div className="prj-header">
          <div className="prj-header-left">
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.07 }}
            >
              Selected Work
            </motion.h2>
          </div>

          <motion.a
            href="/project"
            className="prj-view-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View all
            <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.6rem' }} />
          </motion.a>
        </div>

        {/* ── Filter tabs ── */}
        <div className="toggel-btn">
          {tags.map(({ key, label }) => (
            <motion.button
              key={label}
              className={`filter-btn ${selectedTag === key ? "active" : ""}`}
              onClick={() => setSelectedTag(key)}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* ── Project grid ── */}
        <motion.div
          className="prj-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filtered.length === 0 && (
            <div style={{
              gridColumn: '1 / -1',
              padding: '4rem 2rem',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--stone)',
            }}>
              No projects in this category yet.
            </div>
          )}

          {filtered.map((data, index) => (
            <motion.div
              key={data.projectName + index}
              className="prj-b"
              custom={index}
              variants={fadeUp}
              onClick={() => {
                setSelectedProject(data);
                setShowArticle(true);
              }}
            >
              {/* Card index */}
              <span className="prj-index">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Image */}
              {data.images && (
                <div className="img-container">
                  <img
                    src={urlFor(data.images)?.url()}
                    alt={data.projectName || 'Project'}
                    className="prj-img"
                  />
                </div>
              )}

              {/* Text content */}
              <div className="prj-content-container">
                <div className="prj-main-c">
                  <h3>{data.projectName || 'Untitled'}</h3>
                  {data.tag && (
                    <span className="prj-tag">
                      {data.tag === 'web' ? 'Web Dev' : 'UI/UX'}
                    </span>
                  )}
                </div>
                {data.desc && <p>{data.desc}</p>}

                <div className="prj-hint">
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                  View details
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showArticle && selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowArticle(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowArticle(false)}
                aria-label="Close modal"
              >
                <i className="fa-solid fa-times" />
              </button>

              {selectedProject.images && (
                <img
                  src={urlFor(selectedProject.images)?.url()}
                  alt={selectedProject.projectName || 'Project'}
                  className="modal-image"
                />
              )}



              {selectedProject.overview && (
                <div className="modal-text-container">
                  <PortableText value={selectedProject.overview} />
                </div>
              )}

              {(selectedProject.links || selectedProject.git || selectedProject.behance) && (
                <div className="modal-links">
                  {selectedProject.links && (
                    <a
                      href={selectedProject.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <i className="fa-solid fa-globe" style={{ fontSize: '0.75rem' }} />
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.behance && (
                    <a
                      href={selectedProject.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <i className="fa-brands fa-behance" style={{ fontSize: '0.75rem' }} />
                      Visit Behance
                    </a>
                  )}
                  {selectedProject.git && (
                    <a
                      href={selectedProject.git}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                      style={{ background: 'var(--stone-light)', color: 'var(--ink)' }}
                    >
                      <i className="fa-brands fa-github" style={{ fontSize: '0.75rem' }} />
                      View Source
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
