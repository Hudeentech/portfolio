import React from 'react';
import Projects from '../../components/Projects/Projects';
import { client, urlFor } from '../../client';
import './pa.css';

function ProjectArticle({ Project, projectName, desc, DemoLink, behance, images, github, onClose }) {
 
  return (
    <div className="project-article-overlay" onClick={onClose}>
      <div className="project-article">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="pa-img-container">
            <img src={urlFor(images)} alt="img" className="pa-img" />
        </div>

        <div className="pa-content-info">
        <h2>{projectName}</h2>
        <p>{desc}</p>
        <div className='pa-btn-container'>
            <a href={DemoLink}><button className="prj-btn"> <p>Live demo</p></button></a>
            <a href={behance}><button className="prj-btn"> <p>view UI</p></button></a>
            <a href={github}><button className="prj-btn"> <p>Visit Github</p></button></a>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default ProjectArticle;
