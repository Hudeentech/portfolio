import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Nav/Nav.css";
import { NavLink } from "react-router-dom";
import { client } from "../../client";

function Nav() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    client
      .fetch('*[_type == "cv"][0]{resume{asset->{url}}}')
      .then((data) => {
        if (data?.resume?.asset?.url) {
          setResumeUrl(data.resume.asset.url);
        }
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const sidebarVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { 
        type: "spring", stiffness: 140, damping: 20,
        staggerChildren: 0.1, delayChildren: 0.1 
      } 
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Project", label: "Work" },
    { to: "/#capabilities", label: "Services" },
    { to: "/#experience", label: "Experience" },
  ];

  return (
    <div className="nav-wrapper">
      <motion.div
        className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <motion.div className="logo-container">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <span className="logo-text" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 800, 
              letterSpacing: '-0.05em', 
              color: 'var(--text-primary)' 
            }}>Hudeen.</span>
          </NavLink>
        </motion.div>

        {/* Desktop Links */}
        <ul className="nav-links-container desktop-only">
          {navLinks.map((link) => (
            <li key={link.to}>
              {link.to.includes('#') ? (
                <a href={link.to}>{link.label}</a>
              ) : (
                <NavLink to={link.to}>{link.label}</NavLink>
              )}
            </li>
          ))}
          {resumeUrl && (
             <li>
               <a href={resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
             </li>
          )}
        </ul>

        {/* Primary CTA and Theme Toggle */}
        <div className="nav-actions desktop-only">
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
          </button>
          <a href="mailto:hello@example.com" className="nav-cta">
            Let's Talk
          </a>
        </div>

        {/* Burger & Mobile Theme */}
        <div className="mobile-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn mobile-theme-btn" aria-label="Toggle Theme">
            {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
          </button>
          <button className="burger-btn" onClick={toggleSidebar} aria-label="Open menu">
            <i className={`fa-solid fa-${isSidebarOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                  <motion.li key={link.to} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                    {link.to.includes('#') ? (
                      <a href={link.to} onClick={toggleSidebar}>
                        {link.label}
                      </a>
                    ) : (
                      <NavLink to={link.to} onClick={toggleSidebar}>
                        {link.label}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>

              <a href="mailto:hello@example.com" className="sidebar-btn" onClick={toggleSidebar} style={{textAlign: 'center', textDecoration: 'none'}}>
                Let's Talk
              </a>
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="sidebar-btn" style={{background: 'transparent', border: '1px solid var(--cream)', color: 'var(--cream)', textAlign: 'center', textDecoration: 'none'}}>
                  Download CV
                </a>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
