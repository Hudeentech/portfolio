import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import './Projects.css';
import ProjectArticle from '../../Pages/Projects/ProjectArticle'; // Import the ProjectArticle component

function Projects({ blog, onClick }) {
  const [selectedTag, setSelectedTag] = useState('web');
  const [showArticle, setShowArticle] = useState(false); // State to manage the visibility of the article popup
  const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project data

  const [projectData, setProjectData] = useState([
    {
    projectName: 'John Doe',
    Desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci temporibus quae illum reiciendis sint, omnis nulla reprehenderit, nostrum earum rerum accusamus non tempora, inventore mollitia ratione? Veritatis, aperiam voluptatibus.`,
    imageUrl: '/src/assets/login (1).jpg',
    github:'github.com',
    DemoLink:'www.hudeen.com',
    behance:'www.behance.com',
    tag:'ui',
    id:crypto.randomUUID()
  },
  {
    projectName: 'John Doe',
    Desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci temporibus quae illum reiciendis sint, omnis nulla reprehenderit, nostrum earum rerum accusamus non tempora, inventore mollitia ratione? Veritatis, aperiam voluptatibus.`,
    imageUrl: '/src/assets/contACTS.jpg',
    github:'github.com',
    DemoLink:'www.hudeen.com',
    behance:'www.behance.com',
    tag:'web',
    id:crypto.randomUUID()

  },
  {
    projectName: 'John Doe',
    Desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci temporibus quae illum reiciendis sint, omnis nulla reprehenderit, nostrum earum rerum accusamus non tempora, inventore mollitia ratione? Veritatis, aperiam voluptatibus.`,
    imageUrl: '/src/assets/contACTS.jpg',
    github:'github.com',
    DemoLink:'www.hudeen.com',
    behance:'www.behance.com',
    tag:'web',
    id:crypto.randomUUID()

  },
  {
    projectName: 'John Doe',
    Desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel adipisci temporibus quae illum reiciendis sint, omnis nulla reprehenderit, nostrum earum rerum accusamus non tempora, inventore mollitia ratione? Veritatis, aperiam voluptatibus.`,
    imageUrl: '/src/assets/MacBook Pro 14_ - 1 (10).jpg',
    github:'github.com',
    DemoLink:'www.hudeen.com',
    behance:'www.behance.com',
    tag:'app',
    id:crypto.randomUUID()
  },

]);
  const handleClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowArticle(true);
  };

  return (
    <div className='prj-c'>
       <div className="prj-title">
        <h4>My projects</h4>
        <h2>Exploring the Digital Canvas:<span className="abt-contrast"> My Portfolio</span> Showcase</h2>
      </div>
       
      <div className="toggel-btn">
        <button onClick={() => handleClick('web')} id="web">Web design</button>
        <button onClick={() => handleClick('ui')} id="web">UI/UX</button>
        <button onClick={() => handleClick('app')} id="web">App dev</button>
      </div>

      {projectData
        .filter((data) => !selectedTag || data.tag === selectedTag)
        .map((data) => (
          <div key={data.id} className='prj-b' onClick={() => handleProjectClick(data)}>
            <div key={data.id} className="prj-b">
              <div className="img-container">
                  <img src={data.imageUrl} alt="img" className="prj-img" />
              </div>

              <div className="prj-content-container">
              
                <div className="prj-main-c">
                    <h3 className="name">{data.projectName}</h3>
                    <p>{data.Desc}</p>
                </div>

              </div>
            </div>
          </div>
        ))}

      {showArticle && (
        <ProjectArticle project={selectedProject} onClose={() => setShowArticle(false)} />
      )}
    </div>
  );
}

export default Projects;
