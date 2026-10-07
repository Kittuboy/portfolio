import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Send,
  Server,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Navbar from "./Navbar";
import { api } from "./services/api";

import "./portfolio.css";

const fallback = {
    name: "Vikas Ranjave",

    headline: "Full Stack Developer",

    bio:
        "Full Stack Developer focused on building responsive, scalable and user-friendly web applications using React.js, Node.js, Express.js, MongoDB and Java.",

    github:
        "https://github.com/Kittuboy",

    linkedin:
        "https://www.linkedin.com/in/vikas-ranjave",

    availability:
        "Available for Opportunities",
};

const ease = [
    0.22,
    1,
    0.36,
    1,
];

const reveal = {
    hidden: {
        opacity: 0,
        y: 24,
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.6,
            ease,
        },
    },
};

/* =====================================================
   SECTION
===================================================== */

function Section({
    id,
    eyebrow,
    title,
    children,
}) {
    const ref = useRef(null);

    const inView = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    return (
        <motion.section
            id={id}
            ref={ref}
            variants={reveal}
            initial="hidden"
            animate={
                inView
                    ? "show"
                    : "hidden"
            }
        >
            <div className="section-label">
                {eyebrow}
            </div>

            <h2 className="section-title">
                {title}
            </h2>

            {children}
        </motion.section>
    );
}

/* =====================================================
   BUTTON
===================================================== */

function Button({
    href,
    children,
    secondary = false,
}) {
    return (
        <a
            className={
                secondary
                    ? "button secondary"
                    : "button"
            }
            href={href}
        >
            {children}

            <ArrowUpRight size={16} />
        </a>
    );
}

/* =====================================================
   HOME
===================================================== */

function Home({ onProfile }) {
    const [profile, setProfile] =
        useState(fallback);

    const [projects, setProjects] =
        useState([]);

    const [filter, setFilter] =
        useState("All");

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

    const [status, setStatus] =
        useState("");

    /* ---------------- FETCH PROFILE ---------------- */

    useEffect(() => {
        api
            .get("/profile")
            .then((response) => {
                const updatedProfile = {
                    ...fallback,
                    ...response.data,
                };

                setProfile(updatedProfile);

                if (onProfile) {
                    onProfile(updatedProfile);
                }
            })
            .catch(() => {
                if (onProfile) {
                    onProfile(fallback);
                }
            });

        api
            .get("/projects")
            .then((response) => {
                setProjects(
                    Array.isArray(response.data)
                        ? response.data
                        : []
                );
            })
            .catch(() => {
                setProjects([]);
            });
    }, [onProfile]);

    /* ---------------- PROJECT FILTER ---------------- */

    const visibleProjects =
        useMemo(() => {
            if (filter === "All") {
                return projects;
            }

            return projects.filter(
                (project) =>
                    project.technologies?.some(
                        (technology) =>
                            technology
                                .toLowerCase()
                                .includes(
                                    filter.toLowerCase()
                                )
                    )
            );
        }, [projects, filter]);

    /* ---------------- CONTACT ---------------- */

    const submit = async (event) => {
        event.preventDefault();

        setStatus("sending");

        try {
            await api.post(
                "/contact",
                form
            );

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    /* ---------------- SKILLS ---------------- */

    const skills = [
        [
            "Frontend Development",
            "React.js, JavaScript, HTML5, CSS3 and responsive interfaces",
            Code2,
        ],

        [
            "Backend Development",
            "Node.js, Express.js, REST APIs and JWT authentication",
            Server,
        ],

        [
            "Database",
            "MongoDB, Mongoose and MySQL data modeling",
            Database,
        ],

        [
            "Programming",
            "Java, Core Java and Java SE fundamentals",
            Code2,
        ],

        [
            "Tools & Technologies",
            "Git, GitHub, Postman, VS Code and Vite",
            Code2,
        ],
    ];

    return (
        <>
            {/* PROGRESS */}

            <div className="progress" />

            <main>
                {/* =================================================
            HERO
        ================================================= */}

                <section className="hero">
                    <div className="hero-orb" />

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            show: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        <motion.div
                            variants={reveal}
                            className="availability"
                        >
                            <CheckCircle2 size={15} />

                            {profile.availability}
                        </motion.div>

                        <motion.p
                            variants={reveal}
                            className="kicker"
                        >
                            Hi, I'm
                        </motion.p>

                        <motion.h1
                            variants={reveal}
                        >
                            Vikas{" "}
                            <span>Ranjave</span>
                        </motion.h1>

                        <motion.h2
                            variants={reveal}
                        >
                            {profile.headline}
                        </motion.h2>

                        <motion.p
                            variants={reveal}
                            className="hero-copy"
                        >
                            {profile.bio}
                        </motion.p>

                        <motion.div
                            variants={reveal}
                            className="hero-actions"
                        >
                            <Button href="#projects">
                                View my projects
                            </Button>

                            {profile.resumeUrl && (
                                <Button
                                    secondary
                                    href={profile.resumeUrl}
                                >
                                    Download resume
                                </Button>
                            )}

                            <a
                                className="arrow-link"
                                href="#contact"
                            >
                                Contact me
                                <ArrowUpRight size={16} />
                            </a>
                        </motion.div>

                        <motion.div
                            variants={reveal}
                            className="social-row"
                        >
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaGithub size={17} />
                                GitHub
                            </a>

                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaLinkedinIn size={17} />
                                LinkedIn
                            </a>
                        </motion.div>
                    </motion.div>

                    <div className="scroll-cue">
                        <span />
                        Scroll to explore
                    </div>
                </section>

                {/* =================================================
            ABOUT
        ================================================= */}

                <Section
                    id="about"
                    eyebrow="01 — About"
                    title={
                        <>
                            Building with purpose,
                            <br />
                            <em>
                                learning every day.
                            </em>
                        </>
                    }
                >
                    <div className="about-grid">
                        <p className="lead">
                            I’m an MCA student and
                            software developer
                            interested in turning
                            real-world problems into
                            clean, reliable digital
                            experiences.
                        </p>

                        <p>
                            My work spans full-stack
                            development with React.js,
                            Node.js, MongoDB, REST APIs
                            and Java. I care about
                            responsive interfaces,
                            maintainable architecture
                            and the details that make
                            products feel polished.
                        </p>
                    </div>

                    <div className="stats">
                        <div>
                            <strong>2+</strong>

                            <span>
                                Years freelance /
                                project experience
                            </span>
                        </div>

                        <div>
                            <strong>5+</strong>

                            <span>
                                Core technologies
                            </span>
                        </div>

                        <div>
                            <strong>Multiple</strong>

                            <span>
                                Real-world projects
                            </span>
                        </div>
                    </div>
                </Section>

                {/* =================================================
            SKILLS
        ================================================= */}

                <Section
                    id="skills"
                    eyebrow="02 — Capabilities"
                    title={
                        <>
                            A versatile{" "}
                            <em>toolkit.</em>
                        </>
                    }
                >
                    <div className="skill-grid">
                        {skills.map(
                            (
                                [
                                    name,
                                    description,
                                    Icon,
                                ],
                                index
                            ) => (
                                <motion.article
                                    className="glass-card skill-card"
                                    key={name}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                >
                                    <div className="icon-box">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <h3>
                                            {name}
                                        </h3>

                                        <p>
                                            {description}
                                        </p>
                                    </div>

                                    <span className="card-index">
                                        0{index + 1}
                                    </span>
                                </motion.article>
                            )
                        )}
                    </div>

                    <div className="tech-strip">
                        {[
                            "React.js",
                            "JavaScript",
                            "Node.js",
                            "Express.js",
                            "MongoDB",
                            "Java",
                            "MySQL",
                            "REST APIs",
                            "Git",
                            "GitHub",
                            "Postman",
                        ].map(
                            (technology) => (
                                <span
                                    key={technology}
                                >
                                    {technology}
                                </span>
                            )
                        )}
                    </div>
                </Section>

                {/* =================================================
            PROJECTS
        ================================================= */}

                <Section
                    id="projects"
                    eyebrow="03 — Selected work"
                    title={
                        <>
                            Projects that made
                            <br />
                            <em>
                                an impact.
                            </em>
                        </>
                    }
                >
                    <div className="filter-row">
                        {[
                            "All",
                            "React",
                            "Node.js",
                            "MongoDB",
                            "Java",
                            "Flutter",
                        ].map((item) => (
                            <button
                                type="button"
                                className={
                                    filter === item
                                        ? "filter active"
                                        : "filter"
                                }
                                onClick={() =>
                                    setFilter(item)
                                }
                                key={item}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        layout
                        className="project-grid"
                    >
                        <AnimateProjectList
                            projects={
                                visibleProjects
                            }
                        />
                    </motion.div>

                    {!projects.length && (
                        <div className="empty-state">
                            Projects are loading,
                            or none have been
                            added yet.
                        </div>
                    )}
                </Section>

                {/* =================================================
            EXPERIENCE
        ================================================= */}

                <Section
                    id="experience"
                    eyebrow="04 — Experience"
                    title={
                        <>
                            Learning by{" "}
                            <em>doing.</em>
                        </>
                    }
                >
                    <div className="timeline">
                        <div className="timeline-node" />

                        <div>
                            <h3>
                                Freelance Software
                                Developer
                            </h3>

                            <span className="timeline-meta">
                                Project-based · 2+ years
                            </span>

                            <p>
                                Developed responsive
                                web applications,
                                React.js interfaces
                                and Node.js/Express
                                APIs. Worked with
                                MongoDB,
                                authentication,
                                REST integrations
                                and real-world
                                client/project
                                requirements.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* =================================================
            EDUCATION
        ================================================= */}

                <Section
                    id="education"
                    eyebrow="05 — Education"
                    title={
                        <>
                            The{" "}
                            <em>foundation.</em>
                        </>
                    }
                >
                    <div className="education-grid">
                        <article className="glass-card education-card">
                            <span>01</span>

                            <h3>MCA</h3>

                            <p>
                                Sandip University,
                                Nashik
                            </p>
                        </article>

                        <article className="glass-card education-card">
                            <span>02</span>

                            <h3>BCA</h3>

                            <p>
                                G.H. Raisoni
                                University,
                                Amravati
                            </p>
                        </article>
                    </div>
                </Section>

                {/* =================================================
            CONTACT
        ================================================= */}

                <Section
                    id="contact"
                    eyebrow="06 — Contact"
                    title={
                        <>
                            Have a project
                            <br />
                            <em>
                                in mind?
                            </em>
                        </>
                    }
                >
                    <div className="contact-grid">
                        <div>
                            <p className="lead">
                                Let’s talk about
                                how thoughtful
                                engineering can
                                move it forward.
                            </p>

                            <div className="contact-links">
                                <a
                                    href={`mailto:${profile.email ||
                                        "hello@example.com"
                                        }`}
                                >
                                    Email me
                                    <ArrowUpRight
                                        size={16}
                                    />
                                </a>

                                <a
                                    href={
                                        profile.github
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                    <ArrowUpRight
                                        size={16}
                                    />
                                </a>

                                <a
                                    href={
                                        profile.linkedin
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                    <ArrowUpRight
                                        size={16}
                                    />
                                </a>
                            </div>
                        </div>

                        <form
                            className="contact-form"
                            onSubmit={submit}
                        >
                            <label>
                                Your name

                                <input
                                    required
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Vikas Ranjave"
                                />
                            </label>

                            <label>
                                Email address

                                <input
                                    required
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            email:
                                                event.target.value,
                                        })
                                    }
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label>
                                Subject

                                <input
                                    required
                                    value={form.subject}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            subject:
                                                event.target.value,
                                        })
                                    }
                                    placeholder="Let's build something"
                                />
                            </label>

                            <label>
                                Tell me about your project

                                <textarea
                                    required
                                    rows="4"
                                    value={form.message}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            message:
                                                event.target.value,
                                        })
                                    }
                                    placeholder="A little context helps..."
                                />
                            </label>

                            <button
                                type="submit"
                                className="button"
                                disabled={
                                    status === "sending"
                                }
                            >
                                {status === "sending" ? (
                                    "Sending..."
                                ) : status === "sent" ? (
                                    "Message sent ✓"
                                ) : (
                                    <>
                                        Send message
                                        <Send size={16} />
                                    </>
                                )}
                            </button>

                            {status === "error" && (
                                <p className="form-error">
                                    Could not send.
                                    Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </Section>
            </main>

            {/* FOOTER */}

            <footer>
                <span>
                    ©{" "}
                    {new Date().getFullYear()}{" "}
                    Vikas Ranjave
                </span>

                <span>
                    Designed & built with
                    intention.
                </span>

                <div>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub size={17} />
                    </a>

                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn size={17} />
                    </a>
                </div>
            </footer>
        </>
    );
}

/* =====================================================
   PROJECT LIST
===================================================== */

function AnimateProjectList({
    projects,
}) {
    return (
        <AnimatePresence mode="popLayout">
            {projects.map(
                (project, index) => (
                    <motion.article
                        layout
                        className="project-card"
                        key={project._id}
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <div className="project-number">
                            0
                            {project.order ||
                                index + 1}

                            <ExternalLink
                                size={17}
                            />
                        </div>

                        <h3>
                            {project.title}
                        </h3>

                        <p>
                            {project.shortDescription ||
                                project.description}
                        </p>

                        <div className="chips">
                            {project.technologies?.map(
                                (technology) => (
                                    <span
                                        key={technology}
                                    >
                                        {technology}
                                    </span>
                                )
                            )}
                        </div>

                        <div className="project-actions">
                            <Link
                                className="arrow-link"
                                to={`/projects/${project.slug}`}
                            >
                                View case study
                                <ArrowUpRight
                                    size={16}
                                />
                            </Link>

                            {project.githubUrl && (
                                <a
                                    href={
                                        project.githubUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                >
                                    <FaGithub
                                        size={18}
                                    />
                                </a>
                            )}

                            {project.liveUrl && (
                                <a
                                    href={
                                        project.liveUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Live demo"
                                >
                                    <ExternalLink
                                        size={18}
                                    />
                                </a>
                            )}
                        </div>
                    </motion.article>
                )
            )}
        </AnimatePresence>
    );
}

/* =====================================================
   DETAILS
===================================================== */

function Details() {
    const { slug } =
        useParams();

    const [project, setProject] =
        useState(null);

    useEffect(() => {
        api
            .get(`/projects/${slug}`)
            .then((response) => {
                setProject(
                    response.data
                );
            })
            .catch(() => {
                setProject({
                    title:
                        "Project not found",
                });
            });
    }, [slug]);

    if (!project) {
        return (
            <main className="detail">
                <p>
                    Loading project...
                </p>
            </main>
        );
    }

    return (
        <main className="detail">
            <Link
                className="arrow-link"
                to="/"
            >
                ← Back home
            </Link>

            <div className="section-label">
                Case study
            </div>

            <h1>
                {project.title}
            </h1>

            <p className="detail-lead">
                {project.description}
            </p>

            <div className="detail-grid">
                <div>
                    <h2>Problem</h2>

                    <p>
                        {project.problem ||
                            "A practical challenge that needed a reliable, user-focused digital solution."}
                    </p>

                    <h2>Solution</h2>

                    <p>
                        {project.solution ||
                            project.description}
                    </p>

                    <h2>Features</h2>

                    <ul>
                        {(
                            project.features ||
                            []
                        ).map((feature) => (
                            <li
                                key={feature}
                            >
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <aside className="glass-card detail-aside">
                    <h3>
                        Technology
                    </h3>

                    <div className="chips">
                        {project.technologies?.map(
                            (technology) => (
                                <span
                                    key={technology}
                                >
                                    {technology}
                                </span>
                            )
                        )}
                    </div>

                    {project.githubUrl && (
                        <a
                            className="button"
                            href={
                                project.githubUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                            <FaGithub
                                size={16}
                            />
                        </a>
                    )}

                    {project.liveUrl && (
                        <a
                            className="button secondary"
                            href={
                                project.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            Live demo
                            <ExternalLink
                                size={16}
                            />
                        </a>
                    )}
                </aside>
            </div>
        </main>
    );
}

/* =====================================================
   PORTFOLIO ROUTE
===================================================== */

export default function Portfolio() {
    const [profile, setProfile] =
        useState(fallback);

    return (
        <>
            <Home
                onProfile={setProfile}
            />

            {/* Details route is handled separately
          by App.jsx if needed */}
        </>
    );
}

export { Details };


// export default function Portfolio() {
//   const [profile, setProfile] = useState(fallback);

//   return (
//     <>
//       <Navbar profile={profile} />
//       <Home onProfile={setProfile} />
//     </>
//   );
// }
