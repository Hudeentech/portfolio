import { useEffect, useState } from 'react'
import { urlFor, client } from "../../client.js";

import Marquee from 'react-fast-marquee';
import './marque.css'

function Marque(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    
  const query ='*[_type == "skills"]';

  client.fetch(query)
  .then((data) => setData(data));

   
  }, [])
  

    return (
        <div className="mq-icons">
          <Marquee behavior=" " direction="">
            {
              data.map((data, index) =>(
                <div key={index} className="icons-mq"> <img src={urlFor(data.icons)} alt="" /></div>
              ))
            }
          </Marquee>
        </div>
    );
}

export default Marque;