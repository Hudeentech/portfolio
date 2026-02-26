import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Nav/Nav.css";
import { NavLink } from "react-router-dom";
import { client } from "../../client";

import img from '/src/assets/20231229_212800-removebg-preview.png'

function Nav() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeTitle, setResumeTitle] = useState("resume");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadResume = () => {
    if (!resumeUrl) {
      alert("Resume not available for download.");
      return;
    }
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank';
    link.setAttribute('download', `${resumeTitle}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", stiffness: 150, damping: 20,
        staggerChildren: 0.08, delayChildren: 0.1 
      } 
    },
    exit: { 
      x: "100%", 
      opacity: 0, 
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Project", label: "Projects" },
  ];

  return (
    <div className="nav-wrapper">
      <motion.div
        className="nav-container"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)'
            : '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo */}
        <motion.div
          className="logo-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src={img} alt="Logo" className="logo" />
        </motion.div>

        {/* Desktop Links */}
        <ul className="nav-links-container desktop-only">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          className="nav-cta"
          onClick={downloadResume}
          disabled={!resumeUrl}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="fa-solid fa-download" style={{ fontSize: '0.75rem' }}></i>
          {resumeUrl ? "Download CV" : "Loading..."}
        </motion.button>

        {/* Burger */}
        <button className="burger-btn" onClick={toggleSidebar} aria-label="Open menu">
          <i className={`fa-solid fa-${isSidebarOpen ? 'times' : 'bars'}`}></i>
        </button>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleSidebar}
            />
            <motion.div
              className="sidebar"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="close-btn" onClick={toggleSidebar}>
                <i className="fa-solid fa-times"></i>
              </button>

              <ul className="sidebar-links">
                {navLinks.map((link) => (
                  <motion.li key={link.to} variants={mobileLinkVariants}>
                    <NavLink to={link.to} onClick={toggleSidebar}>
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <button
                className="sidebar-btn"
                onClick={() => { toggleSidebar(); downloadResume(); }}
                disabled={!resumeUrl}
              >
                <i className="fa-solid fa-download" style={{ marginRight: '0.5rem' }}></i>
                {resumeUrl ? "Download CV" : "CV Unavailable"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
