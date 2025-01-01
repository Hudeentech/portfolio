import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Nav/Nav.css";
import { NavLink } from "react-router-dom";
import { client } from "../../client"; // Adjust the import based on your setup

import img from '/src/assets/20231229_212800-removebg-preview.png'

function Nav() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeTitle, setResumeTitle] = useState("resume");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    client
      .fetch('*[_type == "cv"][0]{resume{asset->{url}, title}}')
      .then((data) => {
        if (data?.resume?.asset?.url) {
          setResumeUrl(data.resume.asset.url);
          setResumeTitle(data.resume.title || "resume");
        }
      });
  }, []);

  const downloadResume = () => {
    if (!resumeUrl) {
      alert("Resume not available for download.");
      return;
    }
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank'
    link.setAttribute('download', `${resumeTitle}.pdf`); // Explicitly set the download attribute
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="nav-container">
      {/* Desktop Navigation */}
      <motion.div
        className="logo-container"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={img}
          alt="Logo"
          className="logo"
        />
      </motion.div>

      <ul className="nav-links-container desktop-only">
        <NavLink to="/">
          <li className="nav-links">Home</li>
        </NavLink>
        <NavLink to="/About">
          <li className="nav-links">About Me</li>
        </NavLink>
        <NavLink to="/Project">
          <li className="nav-links">Projects</li>
        </NavLink>
      </ul>

      <button
        className="btn"
        onClick={downloadResume}
        disabled={!resumeUrl} // Disable button if no resume URL
      >
        {resumeUrl ? "Download CV" : "CV Unavailable"}
      </button>

      {/* Burger Icon for Small Screens */}
      <button className="burger-btn" onClick={toggleSidebar}>
        <i className="fa-solid fa-burger"></i>
      </button>

      {/* Sidebar Navigation for Small Screens */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
          >
            <button className="close-btn" onClick={toggleSidebar}>
              <i className="fa-solid fa-times"></i>
            </button>
            <ul className="sidebar-links">
              <NavLink to="/" onClick={toggleSidebar}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/About" onClick={toggleSidebar}>
                <li>About Me</li>
              </NavLink>
              <NavLink to="/Project" onClick={toggleSidebar}>
                <li>Projects</li>
              </NavLink>
              <button
                className="sidebar-btn"
                onClick={() => {
                  toggleSidebar();
                  downloadResume();
                }}
                disabled={!resumeUrl} // Disable if no resume
              >
                {resumeUrl ? "Download CV" : "CV Unavailable"}
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
