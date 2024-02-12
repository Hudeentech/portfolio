import React from 'react';
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import './case-study.css'; 
import ProjectPage from '../ProjectsPage/ProjectPage';

import { Link, useParams } from 'react-router-dom';

const CaseStudy = ({ data }) => {

  const params = useParams({id, data})

  return (
    <>
    <Nav/>
    <div className="case-study-container">
      <h1>Case Study For :projectName</h1>
      <div className="section">
        <h2>Overview</h2>
        <div className="content">
          <img src='/src/assets/MacBook Pro 14_ - 1 (10).jpg' alt="Overview" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio recusandae ex non eos excepturi reprehenderit nam repudiandae ducimus ad dicta, delectus natus maiores? Totam quis voluptate earum corporis in obcaecati.
          Pariatur ex earum dolor corrupti quisquam recusandae itaque quos quod vero quaerat saepe, reprehenderit eius a facere incidunt cumque illum delectus accusantium? Perferendis veniam, dicta sed ipsa possimus quaerat ut!</p>
        </div>
      </div>
      <div className="section">
        <h2>Challenge</h2>
        <div className="content">
          <img src='/src/assets/login (1).jpg' alt="Challenge" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus debitis dignissimos officiis reiciendis, sint libero? Ipsum perferendis atque minima animi! Sapiente amet sint eaque, nulla possimus eius ad voluptate fugit?</p>
        </div>
      </div>
      <div className="section">
        <h2>Solution</h2>
        <div className="content">
          <img src='/src/assets/contACTS.jpg' alt="Solution" />
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam ratione, tempore sequi vero aspernatur ut cumque possimus soluta quo perspiciatis asperiores? Autem eos iste possimus architecto illo, alias ducimus accusantium.</p>
        </div>
      </div>
      <div className="section">
        <h2>Results</h2>
        <div className="content">
          <img src='/src/assets/login (1).jpg' alt="Results" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nam delectus earum asperiores eveniet voluptates. Et voluptatum amet voluptate neque, vero aliquid, necessitatibus eveniet quas non modi vel cupiditate sunt?</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CaseStudy;
