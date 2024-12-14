const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();



const JWT_SECRET = process.env.JWT_SECRET_TOKEN;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).json({ message: "No admin found" });
    }
    if (admin.password !== password) {
      res.status(401).json({ message: "invalid password!!" });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "authentication sucessful!!",
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error encountered whilst trying to Login");
    res
      .status(401)
      .json({ message: "error encountered whilst trying to login" });
  }
});

module.exports = router;
