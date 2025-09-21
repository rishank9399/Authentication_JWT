const mongoose = require('mongoose');

// Middleware to check database connection
const checkDatabaseConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.log('Database connection state:', mongoose.connection.readyState);
    return res.status(503).json({
      message: 'Database connection not available',
      success: false,
      error: 'Service temporarily unavailable'
    });
  }
  next();
};

module.exports = { checkDatabaseConnection };
