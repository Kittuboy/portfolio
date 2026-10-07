const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const Contact = require("../models/ContactMessage");
const auth = require("../middleware/authMiddleware");


// POST /api/contact
router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({
        min: 2,
        max: 80,
      }),

    body("email")
      .isEmail()
      .withMessage("Please enter a valid email"),

    body("subject")
      .trim()
      .isLength({
        min: 2,
        max: 120,
      }),

    body("message")
      .trim()
      .isLength({
        min: 10,
        max: 2000,
      }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Please complete every field correctly",
        });
      }

      const contact = await Contact.create(req.body);

      res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  }
);


// GET /api/contact
router.get("/", auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);
  } catch (error) {
    next(error);
  }
});


// PATCH /api/contact/:id
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(contact);
  } catch (error) {
    next(error);
  }
});


// DELETE /api/contact/:id
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;