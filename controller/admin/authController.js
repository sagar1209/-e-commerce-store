const Admin = require("../../models/admin");
const mongoose = require("mongoose");
const {
  generateHasePassword,
  verifyPassword,
} = require("../../config/hash_password");
const { generateToken } = require("../../config/auth");
require("dotenv").config();

const register = async (req, res) => {
  try {
    if (req.body.password)
      req.body.password = await generateHasePassword(req.body.password);
    const newadmin = await Admin.create(req.body);
    res.status(201).send(newadmin);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "username && Email address is already in use." });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email });

    if (!admin) throw new Error("email address not found");

    const match = await verifyPassword(password, admin.password);

    if (!match) {
      throw new Error("Incorrect password");
    }

    const token = await generateToken({ id: admin._id }, process.env.ADMIN_JWT);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    res.send("log-out admin");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logOut,
};
