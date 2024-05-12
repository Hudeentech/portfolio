import { useEffect, useState } from 'react'
import { urlFor, client } from "../../client.js";

import Marquee from 'react-fast-marquee';
import '../Hero/Hero.css'

function Hero() {

  const [data, setData] = useState([])

  useEffect(() => {
    
    const query ='*[_type == "hero"]';
     client.fetch(query)
     .then((data) => setData(data))
  
  }, [])
  


  return (
    <header>
      {data.map((data, index) => (

        <div key={data.name + index}>
          <div className="overflow">
          <Marquee >
          <h1 className='fade'>{data.fade} </h1>
          </Marquee>
          </div>
    
        <div className="hero-grid">
          <div>
          <h2 className='heading'><span className='pry-contrast'>{data.headingSalutation}</span> {data.Name} </h2>
          </div>
    
          <div>
          <p className='hero-content'>{data.summary}</p>
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
     </div>
        
      ))}
    </header>
  )
}

export default Hero