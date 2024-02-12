import React from 'react'
import Marquee from 'react-fast-marquee'
import './About.css'

function About() {
  return (
    <div className='about-container'>

    <h4>About Me</h4>

      <div className="abt-content-container">
        <h2 className="abt-content">
        I ‘m a <span className="abt-contrast">proficient developer</span> with a robust emphasis on creating high quality and impactful <span className='abt-contrast'>digital experience.</span>
        </h2>

        <button className='abt-btn'>
          <img src="/src/assets/Icon.svg" alt="" />
        </button>
      </div>

      <div className='abt-img-container'>
        <div className="abt-img">
          <img src="/src/assets/Rectangle 28.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default About