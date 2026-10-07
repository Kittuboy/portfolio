
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Download,
  ExternalLink,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import "./ProjectDetails.css";

import { api } from "./services/api";

function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get(`/projects/${slug}`);

        if (mounted) {
          setProject(response.data);
        }
      } catch (err) {
        console.error("Project details error:", err);

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="project-detail-page project-detail-loading">
        <div className="project-loading-box">
          <div className="project-spinner" />
          <p>Loading project...</p>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !project) {
    return (
      <main className="project-detail-page">
        <div className="project-detail-container">
          <div className="project-error">
            <div className="project-section-label">
              404 — Project
            </div>

            <h1>Project not found</h1>

            <p>
              The project you are looking for does not exist or
              could not be loaded.
            </p>

            <Link
              to="/"
              className="project-back-button"
            >
              <ArrowLeft size={17} />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PROJECT DATA
  ========================================================= */

  const features = Array.isArray(project.features)
    ? project.features
    : [];

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <main className="project-detail-page">

      <div className="project-detail-container">

        {/* ===================================================
            BACK
        =================================================== */}

        <motion.div
          className="project-detail-back"
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <Link to="/" className="project-back-link">
            <ArrowLeft size={17} />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* ===================================================
            PAGE GRID
        =================================================== */}

        <div className="project-detail-grid">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            className="project-detail-content"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="project-detail-header">

              <div className="project-detail-eyebrow">
                <span />
                Case Study
              </div>

              <h1>{project.title}</h1>

              <p className="project-detail-description">
                {project.description ||
                  "A practical digital solution designed to solve a real-world problem with a modern and reliable technology stack."}
              </p>

            </header>

            {/* =================================================
                PROBLEM
            ================================================= */}

            <section className="project-content-section">

              <div className="project-section-label">
                01 — Problem
              </div>

              <h2>The Challenge</h2>

              <p>
                {project.problem ||
                  "The project was created to solve a practical problem by providing a reliable, accessible and user-friendly digital experience."}
              </p>

            </section>

            {/* =================================================
                SOLUTION
            ================================================= */}

            <section className="project-content-section">

              <div className="project-section-label">
                02 — Solution
              </div>

              <h2>The Solution</h2>

              <p>
                {project.solution ||
                  project.description ||
                  "A modern solution was designed with a focus on usability, performance, maintainability and scalability."}
              </p>

            </section>

            {/* =================================================
                FEATURES
            ================================================= */}

            <section className="project-content-section">

              <div className="project-section-label">
                03 — Features
              </div>

              <h2>Key Features</h2>

              {features.length > 0 ? (
                <div className="project-feature-list">

                  {features.map((feature, index) => (
                    <motion.div
                      className="project-feature"
                      key={`${feature}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          0.15 + index * 0.04,
                      }}
                    >
                      <div className="project-feature-icon">
                        <CheckCircle2 size={17} />
                      </div>

                      <span>{feature}</span>
                    </motion.div>
                  ))}

                </div>
              ) : (
                <p>
                  The project includes a collection of
                  practical features designed around its
                  core requirements.
                </p>
              )}

            </section>

          </motion.div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <motion.aside
            className="project-detail-sidebar"
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.12,
            }}
          >

            {/* =================================================
                PROJECT CARD
            ================================================= */}

            <div className="project-info-card">

              {/* CARD HEADER */}

              <div className="project-info-header">

                <div>
                  <span className="project-info-label">
                    Project Details
                  </span>

                  <h3>
                    {project.title}
                  </h3>
                </div>

                <div className="project-info-symbol">
                  <ArrowUpRight size={18} />
                </div>

              </div>

              {/* =================================================
                  TECHNOLOGY
              ================================================= */}

              <div className="project-info-divider" />

              <div className="project-info-block">

                <span className="project-info-heading">
                  Technology
                </span>

                <h4>Tech Stack</h4>

                {technologies.length > 0 ? (
                  <div className="project-tech-list">

                    {technologies.map(
                      (technology, index) => (
                        <span
                          key={`${technology}-${index}`}
                        >
                          {technology}
                        </span>
                      )
                    )}

                  </div>
                ) : (
                  <p className="project-info-muted">
                    Technology information is
                    not available.
                  </p>
                )}

              </div>

              {/* =================================================
                  PROJECT ACTIONS
              ================================================= */}

              <div className="project-info-divider" />

              <div className="project-info-block">

                <span className="project-info-heading">
                  Explore
                </span>

                <h4>Project Resources</h4>

                <p className="project-info-description">
                  Access the source code, open the live
                  application, or download the project
                  files.
                </p>

                <div className="project-resource-list">

                  {/* GITHUB */}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-resource github"
                    >
                      <span className="resource-icon">
                        <FaGithub size={17} />
                      </span>

                      <span className="resource-content">
                        <strong>
                          GitHub Repository
                        </strong>

                        <small>
                          View source code
                        </small>
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="resource-arrow"
                      />
                    </a>
                  )}

                  {/* LIVE DEMO */}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-resource"
                    >
                      <span className="resource-icon">
                        <ExternalLink size={17} />
                      </span>

                      <span className="resource-content">
                        <strong>
                          Live Demo
                        </strong>

                        <small>
                          Open live application
                        </small>
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="resource-arrow"
                      />
                    </a>
                  )}

                  {/* DOWNLOAD */}

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="project-resource"
                    >
                      <span className="resource-icon">
                        <Download size={17} />
                      </span>

                      <span className="resource-content">
                        <strong>
                          Download Project
                        </strong>

                        <small>
                          Download project files
                        </small>
                      </span>

                      <Download
                        size={16}
                        className="resource-arrow"
                      />
                    </a>
                  )}

                </div>

              </div>

            </div>

          </motion.aside>

        </div>
      </div>
    </main>
  );
}

export default ProjectDetails;
