const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const express = require("express");

const app = express();
app.use(express.json());

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt, phone });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      message: "Internal server error during signup", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
       secure: process.env.NODE_ENV === 'production',
       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
       domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
       maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error during login", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
    });
    res.status(200).json({ 
      message: "User logged out successfully", 
      success: true 
    });
    next();
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      message: "Internal server error during logout", 
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};