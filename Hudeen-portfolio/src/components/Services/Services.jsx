import { useEffect, useState } from 'react'
import { urlFor, client } from "../../client.js";

import './Services.css'

function Services() {


  const [data, setData] = useState([]);

  useEffect(() => {
     const query = '*[_type == "service"]'

     client.fetch(query)
      .then((data) => setData(data));
  
  }, [])
  

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
        
        {data.map((data, index) => (
          <div key={index} className="svc-card">
          <img src={urlFor(data.icon)} alt=""/>
          <h4>{data.heading}</h4>
          <p>{data.summary}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Services