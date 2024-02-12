import React from 'react'
import './Exp.css'

function Exp() {
  return (
    <div className='exp'>

     <div className="exp-heading-container">
     <h4>Experience</h4>

      <h2 className="exp-heading">
      With extensive <span className="abt-contrast">experience</span> in <span className="abt-contrast">interactive design</span>, I've collaborated with end organizations      </h2>
     </div>


     <div className="experience-content">
      <div className="exp-component">
      <h3 className="year">
        2018 - 2019
      </h3>

        <div className="experience">
          <p >
            With extensive experience in interactive design, I’ve collaborated with high end organizations
          </p>
          <div>
          <img src="/src/assets/Vector.svg" alt="" className="exp-img" />
          <img src="/src/assets/Vector (1).svg" alt="" className="exp-img" />
          <img src="/src/assets/js-square.svg" alt="" className="exp-img" />
          </div>
        </div>
      </div>

      <div className="exp-component">
      <h3 className="year">
        2020 - 2021
      </h3>

        <div className="experience">
          <p>
            With extensive experience in interactive design, I’ve collaborated with high end organizations
          </p>
          <div>
          <img src="/src/assets/wordpress.svg" alt="" className="exp-img" />
          <img src="/src/assets/react (1).svg" alt="" className="exp-img" />
          <img src="/src/assets/blender-svgrepo-com.svg" alt="" className="exp-img" />
          <img src="/src/assets/adobe-xd-svgrepo-com.svg" alt="" className="exp-img" />
          <img src="/src/assets/photoshop-svgrepo-com.svg" alt="" className="exp-img" />
          </div>
        </div>
      </div>

      <div className="exp-component">
      <h3 className="year">
        2022 - 2023
      </h3>

        <div className="experience">
          <p>
            With extensive experience in interactive design, I’ve collaborated with high end organizations
          </p>
          <div>
          <img src="/src/assets/figma-svgrepo-com.svg" alt="" className="exp-img" />
          <img src="/src/assets/framer-logo-fill-svgrepo-com.svg" alt="" className="exp-img" />
          </div>
        </div>
      </div>

      <div className="exp-component">
      <h3 className="year">
        Now
      </h3>

        <div className="experience">
          <p className="experience">
            With extensive experience in interactive design, I’ve collaborated with high end organizations
          </p>
          <div>
          <img src="/src/assets/node-16-svgrepo-com.svg" alt="" className="exp-img" />
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Exp