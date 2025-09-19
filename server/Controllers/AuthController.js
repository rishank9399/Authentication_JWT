const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const express = require("express");
const axios = require("axios");

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
    });
    await axios.post(
      `https://graph.facebook.com/v21.0/710743975466175/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${phone}`,
        type: "text",
        text: { body: `Hi ${username}, thanks for submitting the form! 🎉` }
      },
      {
        headers: {
          Authorization: `Bearer EAASZAfddKLzgBPeKZBfsQSqSJ9gzhuf0FB5sEZCxP2sWjZBi33tWjUQCv2ldkalOndp7fLxGLZBTk0HdM0DkhFwKxIHkzEMGkqxf0suZCTjW0Ljvxeb0KQ3WYP57IvupmZAjOe7pErMGhdqFoMZCjdAuiOxuXC26Y9QkMPrr5NZBq44HcXe3q6FMFZBp7XAfgrZAIAC8Nym1yrZCcpZBbz835nbB7tViUo94x4ccawvHRPnJK0QZDZD`,
          "Content-Type": "application/json"
        }
      }
    )
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
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
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
};