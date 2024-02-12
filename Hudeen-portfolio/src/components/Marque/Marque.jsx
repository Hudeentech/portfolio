import React from 'react';
import Marquee from 'react-fast-marquee';

import './marque.css'

function Marque(props) {
    return (
        <div className="mq-icons">
          <Marquee behavior=" " direction="">
           <div className="icons-mq"> <img src="/src/assets/adobe.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/react (1).svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/wordpress.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/Vector.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/Vector (1).svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/js-square.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/adobe.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/react (1).svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/wordpress.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/Vector.svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/Vector (1).svg" alt="" /></div>
           <div className="icons-mq"> <img src="/src/assets/js-square.svg" alt="" /></div>
          </Marquee>
        </div>
    );
}

export default Marque;