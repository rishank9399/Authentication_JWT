const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URL } = process.env;

console.log('Testing MongoDB connection...');
console.log('MONGO_URL:', MONGO_URL ? 'Set' : 'Not set');

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    family: 4
  })
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connection state:', mongoose.connection.readyState);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });
