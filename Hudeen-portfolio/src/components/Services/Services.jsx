import React from 'react'
import './Services.css'

function Services() {
  return (
    <div className='svc'>
       <img src="/src/assets/Mask group.png" alt="" className="patterns" />
      <h4> What I Do </h4>

      <div className="svc-container">
        <h2>
          With extensive <span className="abt-contrast">experience</span> in <span className="abt-contrast">interactive design</span>, I've collaborated with end organizations
        </h2>
      </div>

      <div className="svc-card-container">
        <div className="svc-card">
          <img src="/src/assets//Group 2.svg" alt="" className="svc-img" />
          <h4>Web Design</h4>
          <p>Bringing websites to life with intuitive designs</p>
        </div>

        <div className="svc-card">
          <img src="/src/assets/Vector (2).svg" alt="" className="svc-img" />
          <h4>UI/UX Design</h4>
          <p>crafting seamless user experiences</p>
        </div>
        
        <div className="svc-card">
          <img src="/src/assets/device-mobile.svg" alt="" className="svc-img" />
          <h4>App Development</h4>
          <p>Building innovative and functional applications</p>
        </div>

        <div className="svc-card">
          <img src="/src/assets/chart-pie.svg" alt="" className="svc-img" />
          <h4>SEO Expert</h4>
          <p>Elevating your online presence with SEO Exellence</p>
        </div>

      </div>
    </div>
  )
}

export default Services