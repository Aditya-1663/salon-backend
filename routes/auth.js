const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../schema/User");
const fetchuser = require("../middleware/fatchusers");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const jwt_secret = "adityakumarisgoodBoy";

router.post(
  "/createuser",
  [
    body("name", "enter the valid name").isLength({ min: 3 }),
    body("email", "enter the valid email").isEmail(),
    body("password", "password must be 6 charter").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this already exists" });
      }
      const slat = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, slat);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);

      success = true;
      res.json({ success, authtoken });
    } catch (err) {
      console.log(err);
    }
  }
);

//route: user login part

router.post(
  "/login",
  [
    body("email", "enter the valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      let success = false;

      if (!user) {
        return res.status(400).json({ success, error: "wrong not match" });
      }

      const passwordcom = await bcrypt.compare(password, user.password);
      if (!passwordcom) {
        success = false;
        return res.status(400).json({ success, error: "already exists" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
    }
  }
);

//delete userid
router.delete("/delete", fetchuser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ sucess: "user is deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
