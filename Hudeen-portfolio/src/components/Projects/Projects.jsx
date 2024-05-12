import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { urlFor, client } from "../../client.js";

import './Projects.css';
import ProjectArticle from '../../Pages/Projects/ProjectArticle'; // Import the ProjectArticle component

function Projects({ blog, onClick }) {
  const [selectedTag, setSelectedTag] = useState('web');
  const [showArticle, setShowArticle] = useState(false); // State to manage the visibility of the article popup
  const [selectedProject, setSelectedProject] = useState(null); // State to store the selected project data

  const [projectData, setProjectData] = useState([]);

  const handleClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowArticle(true);
  };

 
  useEffect(() => {
    
    const query = '*[_type == "projects"]';
 
    client.fetch(query)
       .then((data) => setProjectData(data));
   
   }, [])
  

  return (
    <div className='prj-c'>
       <div className="prj-title">
        <h4>My projects</h4>
        <h2>Exploring the Digital Canvas:<span className="abt-contrast"> My Portfolio</span> Showcase</h2>
      </div>
       
      <div className="toggel-btn">
        <button onClick={() => handleClick('web')} id="web">Web design</button>
        <button onClick={() => handleClick('ui')} id="web">UI/UX</button>
        {/* <button disabled onClick={() => handleClick('app')} id="web">App dev</button>  */}
      </div>

      {projectData
        .filter((data) => !selectedTag || data.tag === selectedTag)
        .map((data , index) => (
          <div key={data + index} className='prj-b' onClick={() => handleProjectClick(data)}>
            <div key={index} className="prj-b">
              <div className="img-container">
                  <img src={urlFor(data.images)} alt="img" className="prj-img" />
              </div>

              <div className="prj-content-container">
              
                <div className="prj-main-c">
                    <h3 className="name">{data.projectName}</h3>
                    <p>{data.desc}</p>
                </div>

        {showArticle && (
        <ProjectArticle 
        projectName={data.projectName}
        images={data.images}
        desc={data.desc}
        DemoLink={data.link}
        behance={data.behance}
        github={data.git}

        onClose={() => setShowArticle(false)} />
      )}

              </div>
            </div>
          </div>
        ))}
     

    </div>
  );
}

export default Projects;
