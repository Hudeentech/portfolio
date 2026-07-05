import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { urlFor, client } from "../../client.js";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(state?.project || null);
  const [loading, setLoading] = useState(!state?.project);
  
  const bgColor = project?.bgColor || '#1A1A1A';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project && id) {
      // Fallback fetch if user navigates directly to URL
      client.fetch(`*[_type == "projects" && _id == $id][0]`, { id })
        .then((data) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, project]);

  if (loading) {
    return (
      <div className="project-details-page">
        <Nav />
        <div className="loading-state">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-page">
        <Nav />
        <div className="error-state">
          <h2>Project Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '2rem' }}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      <Nav />
      
      <main className="pd-main">
        <div className="container" style={{ paddingBottom: '2rem' }}>
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i> Back to Projects
          </button>
        </div>

        <div className="container">
          <div className="pd-hero-clean">
            <div className="pd-hero-text">
              <h1>{project.projectName}</h1>
              {project.tag && (
                <div className="pd-meta">
                  <span className="pd-tag-clean">{project.tag}</span>
                </div>
              )}
            </div>
            
            {project.images && (
              <div className="pd-hero-image-wrapper">
                <img src={urlFor(project.images)?.url()} alt={project.projectName} className="pd-hero-image-clean" />
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <div className="pd-content">
            {project.overview ? (
              <PortableText value={project.overview} />
            ) : (
              <p>No overview provided.</p>
            )}

            {/* Display case study images */}
            <div className="pd-case-gallery">
              {project.caseStudyImages && project.caseStudyImages.length > 0 ? (
                project.caseStudyImages.map((img, idx) => (
                  <img key={idx} src={urlFor(img)?.url()} alt={`Case Study ${idx + 1}`} className="pd-case-image" />
                ))
              ) : (
                <>
                  {project.case && <img src={urlFor(project.case)?.url()} alt="Case Study 1" className="pd-case-image" />}
                  {project.case2 && <img src={urlFor(project.case2)?.url()} alt="Case Study 2" className="pd-case-image" />}
                </>
              )}
            </div>
            
            {project.conclusion && (
              <div className="pd-conclusion">
                <PortableText value={project.conclusion} />
              </div>
            )}
          </div>

          <div className="pd-actions">
            {project.links && (
              <a href={project.links} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Launch Site
              </a>
            )}
            {project.git && (
              <a href={project.git} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Source Code
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProjectDetails;
