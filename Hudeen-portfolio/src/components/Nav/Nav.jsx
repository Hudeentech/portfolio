import React from 'react'
import '../Nav/Nav.css'

import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className='nav-container'>
      
      <div className="logo-container">
      <img src="/src/assets/20231229_212800-removebg-preview.png" alt="" className="logo" />
      </div>

      <div>
        <ul className="nav-links-container">
          <Link to="/"><li className="nav-links">Home</li></Link>
          <Link to="/about"><li className="nav-links">About</li></Link>
          <Link to="/Project"><li className="nav-links">Projects</li></Link>
        </ul>
      </div>


      <div className="btn-container">
        <button className="btn">Download CV</button>
      </div>
    </div>
  )
}

export default Nav