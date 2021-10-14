const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");
const JWT_SECRET = "Thisisasecuredtext";
let fetchuser = require("../middleware/fetchUser");

// Create a user usint POST "/api/auth" : No auth req
// Route 1 : create user route
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success, error: "Some error occured" });
    }
  }
);

// Login user using POST "/api/auth/login" : No auth req
// Route 2 i.e. Login route
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password cant be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const passwordComapare = await bcrypt.compare(password, user.password);
      if (!passwordComapare) {
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken, user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success, error: "Internal server error" });
    }
  }
);

// Route 3 : Get user details
router.post("/getuser", fetchuser, async (req, res) => {
  let success = false;
  try {
    userId = req.user.id;
    const user = await User.findById(userId);
    success = true;
    res.send({ success, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success, error: "Internal server error" });
  }
});

module.exports = router;
