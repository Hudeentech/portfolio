import { useEffect, useState } from 'react'
import { urlFor, client } from "../../client.js";


import './About.css'

function About() {

  const [aboutData, setAboutData] = useState([]);


  useEffect(() => {
    
   const query = '*[_type == "about"]';

   client.fetch(query)
      .then((data) => setAboutData(data));
  
  }, [])
  

  return (

    <div className='about-container'>

      <h4>About Me</h4>

        {aboutData.map((data, index) => (
          <>
            <div key={data.title + index} className="abt-content-container">
            <h2 className="abt-content">
              <span className="abt-contrast">{data.contrast}</span>
              {data.title}
            </h2>

            <button className='abt-btn'>
              <img src="/src/assets/Icon.svg" alt="" />
            </button>
          </div>

          <div className='abt-img-container'>
            <div className="abt-img">
              <img src={urlFor(data.imgUrl)} alt={data.name} />
            </div>
          </div>
          </>)
          )
        }
    
  </div>
  )
}

export default About