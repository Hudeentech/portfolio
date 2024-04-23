import { useEffect, useState } from 'react'
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion"

import './Exp.css'

function Exp() {

    const [expData, setExpData] =useState([]);
    const [wData, setWData] = useState([]);

 useEffect(() => {

   const expQuery = '*[_type == "experience"],{}';
  const query = '*[_type == "expWallpaper"]';

  client.fetch(query)
  .then((data) => setWData(data))

  client.fetch(expQuery)
  .then((data) => setExpData(data))
 },[])




  return (
    <div className='exp'>

    {wData.map((data, index)=>(
      <div key={index} style={{backgroundImage:`url(${urlFor(data.wallpaper)})`}} className="exp-heading-container">
      <h4>Experience</h4>

       <h2 className="exp-heading">
       {data.heading}<span className="abt-contrast">{data.contrast1}</span> <span className="abt-contrast">{data.contrast2}</span> {data.contrast3} </h2>

      </div>
       ))}



 <div className="experience-content">

      {expData.map((data, index) => (
         <div key={index} className="exp-component">
         <h3 className="year">
           {data.years}
         </h3>

           <div className="experience">
             <p >
               {data.summary}
             </p>
             <div>
             {expData.images.expIcons.map((icon, index) => (
              <img key={index} src={icon} alt={`Experience icon ${index}`} />
            ))}
             </div>
           </div>
         </div> 
      ))
      }
     </div>
    </div>
  )
}

export default Exp