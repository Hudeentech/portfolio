import React from 'react'
import Marquee from 'react-fast-marquee';
import '../Hero/Hero.css'

function Hero() {
  return (
    <header>
      <div className="overflow">
      <Marquee >
      <h1 className='fade'>SALAHUDEEN DANESI </h1>
      </Marquee>
      </div>

    <div className="hero-grid">
      <div>
      <h2 className='heading'><span className='pry-contrast'>👋Hi there, i am</span> Salahudeen Danesi </h2>
      </div>

      <div>
      <p className='hero-content'><span className='contrast'>Crafting digital experiences that stand out.</span> Transforming websites into captivating journeys that engageand delight users.</p>
      </div>
    </div>
  

    <button className='down-btn'><img src="/src/assets/arrow-down.svg" alt="" /></button>
    
    <div className="social-icons">
    <img src="/src/assets/Facebook.svg" alt="" />
    <img src="/src/assets/Instagram.svg" alt="" />
    <img src="/src/assets/WhatsApp.svg" alt="" />
    <img src="/src/assets/Telegram App.svg" alt="" />
    </div>

    <img className='patterns' src="/src/assets/Mask group.png" alt="" />
    </header>
  )
}

export default Hero