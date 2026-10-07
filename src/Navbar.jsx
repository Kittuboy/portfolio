import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import "./Navbar.css";

function Navbar({ profile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const links = [
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Contact",
  ];

  const scrollToSection = (section) => {
    closeMenu();

    setTimeout(() => {
      const element = document.getElementById(
        section.toLowerCase()
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  return (
    <>
      <nav className={scrolled ? "nav scrolled" : "nav"}>
        {/* Logo */}
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          VR<span>.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-links">
          {links.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollToSection(link)}
            >
              {link}
            </button>
          ))}

          <a
            href={profile?.github || "#"}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="GitHub"
          >
            <FaGithub size={17} />
          </a>

          <a
            href={profile?.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={17} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-button"
          aria-label={
            open ? "Close navigation" : "Open navigation"
          }
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.div
              className="mobile-nav"
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <div className="mobile-nav-header">
                <span>Navigation</span>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X size={21} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {links.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => scrollToSection(link)}
                  >
                    <span>{link}</span>
                    <span className="mobile-arrow">↗</span>
                  </button>
                ))}
              </div>

              <div className="mobile-socials">
                <a
                  href={profile?.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  <FaGithub size={17} />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile?.linkedin || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  <FaLinkedinIn size={17} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;