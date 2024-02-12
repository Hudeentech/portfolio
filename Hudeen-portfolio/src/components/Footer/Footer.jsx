import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='footer'>
      <div className="contact-headlines">
        <h4>CONTACT</h4>
        <h1 className="conact-heading">
          Let's collaborate! Reach out and let's create something amazing together.
        </h1>
      </div>

      <div className="contact-links">
        <ul>
          <li>Facebook</li>
          <li>x (Twitter)</li>
          <li>Instagram</li>
          <li>Telegram</li>
          <li>WhatsApp</li>
          <li>Behance</li>
          <li>Dribble</li>
        </ul>

        <button className='buzz'>Buzz Me</button>
      </div>
    </div>
  )
}

export default Footer