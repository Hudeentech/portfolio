import { useEffect, useState } from "react";
import { urlFor, client } from "../../client.js";
import "./Exp.css";

function Exp() {
  const [wData, setWData] = useState([]);
  const [yrData, setYrData] = useState([]);

  useEffect(() => {
    const wallpaperQuery = '*[_type == "expWallpaper"]';
    const experienceQuery = '*[_type == "experienceByYear"]';

    Promise.all([client.fetch(wallpaperQuery), client.fetch(experienceQuery)])
      .then(([wallpaperData, experienceData]) => {
        const validWallpaper = wallpaperData && wallpaperData.length > 0 && wallpaperData[0].heading;

        const fallBackWData = [
          {
            wallpaper: null,
            heading: "Front-End Focus:",
            contrast1: "Crafting",
            contrast2: "Immersive Web",
            contrast3: "Experiences",
          }
        ];
        
        setWData(validWallpaper ? wallpaperData : fallBackWData);
        setYrData(experienceData || []);
      })
      .catch((error) => console.error('Exp fetch error:', error));
  }, []);

  return (
    <section className="exp">
      <div className="exp-inner">
        {/* Banner header */}
        {wData.map((data, index) => (
          <div
            key={index}
            className="exp-heading-container"
            style={{
              backgroundImage: data.wallpaper ? `url(${urlFor(data.wallpaper)?.url()})` : 'none',
            }}
          >
            <h4>Experience</h4>
            <h2 className="exp-heading">
              {data.heading}{" "}
              <span className="abt-contrast">{data.contrast1}</span>{" "}
              <span className="abt-contrast">{data.contrast2}</span>{" "}
              <span className="abt-contrast">{data.contrast3}</span>
            </h2>
          </div>
        ))}

        {/* Timeline */}
        <div
          className="experience-content"
        >
          {yrData.map((yearData, index) => (
            <div
              key={index}
              className="exp-component"
            >
              <h3 className="year">{yearData.year}</h3>
              <div className="experience">
                <div>
                  {(yearData.skills || []).map((skill, idx) => {
                      let src;
                      try { src = urlFor(skill)?.url(); } catch { return null; }
                      if (!src) return null;
                      return (
                        <img
                          key={idx}
                          src={src}
                          alt={`Skill ${idx}`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Exp;
