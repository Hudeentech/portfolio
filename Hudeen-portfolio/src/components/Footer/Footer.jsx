import React, { useEffect, useState } from "react";
import { client } from "../../client";
import "./Footer.css";

function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client.fetch('*[_type == "footer"][0]')
      .then(setFooterData)
      .catch(console.error);
  }, []);

  const year = new Date().getFullYear();
  const links = footerData?.links || [
    { title: "LinkedIn", url: "#" },
    { title: "Twitter", url: "#" },
    { title: "Github", url: "#" },
    { title: "Dribbble", url: "#" }
  ];

  return (
    <footer className="footer-flow" id="contact">
      <div className="container footer-flow-container">

        <div className="footer-cta-block">
          <h2>Ready to build something meaningful?</h2>
          <p>Whether you're launching a startup, redesigning a product, or building a new brand, I'd love to hear about it.</p>
          <a href="mailto:hello@example.com" className="btn-primary">Start a Project</a>
        </div>

        <div className="footer-massive-name">
          <h1>HUDEEN</h1>
        </div>

        <div className="footer-minimal-bottom">
          <div className="footer-links">
            {links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            ))}
          </div>
          <div className="footer-copy">
            <span>&copy; {year} Hudeen. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
