import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./project-page.css";
import "../../components/Projects/Projects.css";
import { urlFor, client } from "../../client.js";
import Footer from "../../components/Footer/Footer";

function ProjectPage() {
  const [projectData, setProjectData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await client.fetch(`
        *[_type == "projectPage"]{
          _id,
          projectName,
          desc,
          imageUrl,
          bgColor,
          github,
          demoLink,
          behance,
          tag,
          case,
          case2,
          caseStudyImages,
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
          <h2>All Work</h2>
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

      {/* Stack */}
      {!loading && (
        <div className="prj-page-stack">
          {filtered.length === 0 && (
            <p className="prj-page-empty">No projects found in this category yet.</p>
          )}

          {filtered.map((data) => {
            const bgColor = data.bgColor || '#1A1A1A';
            return (
              <motion.div
                key={data._id}
                className="project-showcase-card"
                style={{ backgroundColor: bgColor }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/project/${data._id}`, { state: { project: data } })}
              >
                <div className="card-left">
                  <div className="card-left-top">
                    <h3>{data.projectName || 'Untitled'}</h3>
                    {data.tag && <span className="card-tag">{data.tag}</span>}
                    <p className="card-summary">
                      {data.desc || "Delivering high-impact design and engineering solutions that drive user engagement and business value."}
                    </p>
                  </div>
                  <div className="card-cta">
                    <span>Read Case Study</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>

                <div className="card-right">
                  {data.imageUrl ? (
                    <img
                      src={urlFor(data.imageUrl)?.url()}
                      alt={data.projectName || 'Project'}
                      className="card-image"
                    />
                  ) : (
                    <div className="card-image-placeholder"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProjectPage;
