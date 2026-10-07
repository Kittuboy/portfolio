const router = require("express").Router();

const Profile = require("../models/Profile");
const auth = require("../middleware/authMiddleware");


// GET /api/profile
router.get("/", async (req, res, next) => {
  try {
    const profile = await Profile.findOne();

    res.json(profile || {});
  } catch (error) {
    next(error);
  }
});


// PUT /api/profile
router.put("/", auth, async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.json(profile);
  } catch (error) {
    next(error);
  }
});


module.exports = router;