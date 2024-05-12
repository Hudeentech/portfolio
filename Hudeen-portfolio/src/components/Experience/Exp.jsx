import { useEffect, useState } from 'react';
import { urlFor, client } from "../../client.js";
import { motion } from "framer-motion";

import './Exp.css';

function Exp() {
    const [expData, setExpData] = useState([]);
    const [wData, setWData] = useState([]);
    const [yrData, setYrData] = useState([]);

    useEffect(() => {

        const query = '*[_type == "expWallpaper"]';

        client.fetch(query)
            .then(data => setWData(data))
            .catch(error => console.error('Error fetching wallpaper data:', error));
    }, []);


    return (
        <div className='exp'>
            
            {wData.map((data, index) => (
                <div key={index} style={{backgroundImage:`url(${urlFor(data.wallpaper)})`}} className="exp-heading-container">
                    <h4>Experience</h4>
                    <h2 className="exp-heading">
                        {data.heading}<span className="abt-contrast">{data.contrast1}</span> <span className="abt-contrast">{data.contrast2}</span> {data.contrast3}
                    </h2>
                </div>
            ))}

            <div className="experience-content">
                    <div className="exp-component">
                        <h3 className="year">2018 - 2019</h3>
                        <div className="experience">
                            <div> 
                                <img src='./adobe-xd-svgrepo-com.svg' alt={`Experience icon`} />
                                <img src='./html5-svgrepo-com.svg' alt={`Experience icon`} />
                                <img src='./wordpress.svg' alt={`Experience icon`} />
                                <img src='./css3-02-svgrepo-com.svg' alt={`Experience icon`} />
                            </div>
                        </div>
                    </div>

                    <div className="exp-component">
                        <h3 className="year">2020 - 2021</h3>
                        <div className="experience">
                            <div> 
                                <img src='./figma-svgrepo-com.svg' alt={`Experience icon`} />
                                <img src='./blender-svgrepo-com.svg' alt={`Experience icon`} />
                                <img src='./js-square.svg' alt={`Experience icon`} />
                            </div>
                        </div>
                    </div>

                    <div className="exp-component">
                        <h3 className="year">2022 - 2023</h3>
                        <div className="experience">
                            <div> 
                                <img src='./framer-logo-fill-svgrepo-com.svg' alt={`Experience icon`} />
                                <img src='./react (1).svg' alt={`Experience icon`} />
                                <img src='./photoshop-svgrepo-com.svg' alt={`Experience icon`} />
                            </div>
                        </div>
                    </div>

                    <div className="exp-component">
                        <h3 className="year">Now</h3>
                        <div className="experience">
                            <div> 
                                <img src="./node-16-svgrepo-com.svg" alt={`Experience icon`} />
                                <img src='./mongodb-logo-svgrepo-com.svg' alt={`Experience icon`} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Exp;
