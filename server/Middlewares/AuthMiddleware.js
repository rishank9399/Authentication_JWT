const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  try {
    const token = req.cookies.token
    console.log('Token received:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('No token found in cookies');
      return res.json({ status: false, message: 'No token provided' })
    }
    
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.json({ status: false, message: 'Invalid token' })
      } else {
        try {
          const user = await User.findById(data.id)
          if (user) {
            console.log('User verified:', user.username);
            return res.json({ status: true, user: user.username })
          } else {
            console.log('User not found in database');
            return res.json({ status: false, message: 'User not found' })
          }
        } catch (dbError) {
          console.error('Database error during user verification:', dbError);
          return res.json({ status: false, message: 'Database error' })
        }
      }
    })
  } catch (error) {
    console.error('Error in userVerification:', error);
    return res.json({ status: false, message: 'Server error' })
  }
}