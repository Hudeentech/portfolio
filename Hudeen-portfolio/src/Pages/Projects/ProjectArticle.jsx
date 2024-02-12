import React from 'react';
import Projects from '../../components/Projects/Projects';
import './pa.css';

function ProjectArticle({ project, onClose }) {
 
  return (
    <div className="project-article-overlay" onClick={onClose}>
      <div className="project-article">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="pa-img-container">
            <img src={project.imageUrl} alt="img" className="pa-img" />
        </div>

        <div className="pa-content-info">
        <h2>{project.projectName}</h2>
        <p>{project.Desc}</p>
        <div className='pa-btn-container'>
            <a href={project.DemoLink}><button className="prj-btn"> <p>Live demo</p> <img src="/src/assets/eye.svg" alt="" className="prj-icons" /></button></a>
            <a href={project.behance}><button className="prj-btn"> <p>view UI</p> <img src="/src/assets/globe-alt.svg" alt="" className="prj-icons" /></button></a>
            <a href={project.github}><button className="prj-btn"> <p>Visit Github</p> <img src="/src/assets/paper-airplane.svg" alt="" className="prj-icons" /></button></a>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default ProjectArticle;
