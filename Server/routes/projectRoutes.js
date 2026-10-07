const router = require("express").Router();

const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");


// GET /api/projects
router.get("/", async (req, res, next) => {
  try {
    const query = req.query.technology
      ? {
          technologies: {
            $regex: req.query.technology,
            $options: "i",
          },
        }
      : {};

    const projects = await Project.find(query).sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    next(error);
  }
});


// GET /api/projects/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});


// POST /api/projects
router.post("/", auth, async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});


// PUT /api/projects/:id
router.put("/:id", auth, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(project);
  } catch (error) {
    next(error);
  }
});


// DELETE /api/projects/:id
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;