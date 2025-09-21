# MongoDB Connection Troubleshooting Guide

## 🚨 Current Issue: "Operation `users.findOne()` buffering timed out after 10000ms"

This error indicates that your MongoDB connection is not properly established or is timing out.

## 🔧 **Immediate Fixes Applied:**

### 1. **Improved MongoDB Connection Options**
- Added proper timeout settings
- Disabled mongoose buffering
- Added connection event handlers
- Added graceful shutdown handling

### 2. **Database Connection Middleware**
- Added connection check before processing requests
- Returns proper error response if database is not connected

### 3. **Better Error Handling**
- Added detailed connection logging
- Added connection state monitoring

## 🧪 **Testing Your Connection:**

### **Step 1: Test MongoDB Connection**
```bash
cd server
node test-connection.js
```

This will test your MongoDB connection and show you exactly what's wrong.

### **Step 2: Check Your Environment Variables**
Make sure you have a `.env` file in your `server` folder with:

```env
NODE_ENV=development
PORT=5000
MONGO_URL=mongodb://localhost:27017/authentication_jwt
TOKEN_KEY=your_super_secret_jwt_key_here_make_it_long_and_secure_at_least_32_characters
CORS_ORIGIN_SITE=http://localhost:3000
COOKIE_DOMAIN=localhost
```

## 🔍 **Common Issues & Solutions:**

### **Issue 1: MongoDB Not Running**
**Solution**: Start MongoDB service
```bash
# Windows
net start MongoDB

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### **Issue 2: Wrong MongoDB URL**
**Solution**: Check your MONGO_URL format
- **Local**: `mongodb://localhost:27017/authentication_jwt`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/authentication_jwt`

### **Issue 3: MongoDB Atlas Connection Issues**
**Solutions**:
1. **Check Network Access**: Add `0.0.0.0/0` to allow all IPs
2. **Check Database User**: Ensure username/password are correct
3. **Check Cluster Status**: Ensure cluster is running

### **Issue 4: Port Already in Use**
**Solution**: Change the port in your `.env` file
```env
PORT=5001
```

## 🚀 **Quick Fix Steps:**

1. **Create/Update `.env` file** in `server` folder:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/authentication_jwt
   TOKEN_KEY=mySuperSecretJWTKeyForAuthentication2024!@#$%^&*()
   CORS_ORIGIN_SITE=http://localhost:3000
   COOKIE_DOMAIN=localhost
   ```

2. **Test the connection**:
   ```bash
   cd server
   node test-connection.js
   ```

3. **Start your server**:
   ```bash
   cd server
   npm start
   ```

4. **Check the console output** for connection status

## 📋 **Connection States:**
- `0` = disconnected
- `1` = connected
- `2` = connecting
- `3` = disconnecting

## 🎯 **Expected Output:**
When everything is working, you should see:
```
MongoDB is connected successfully
Database: authentication_jwt
Mongoose connected to MongoDB
Server is listening on port 5000
```

## 🆘 **If Still Not Working:**

1. **Check if MongoDB is installed and running**
2. **Verify your `.env` file exists and has correct values**
3. **Try using MongoDB Atlas instead of local MongoDB**
4. **Check firewall settings**
5. **Restart your computer and try again**

The fixes I've applied should resolve the buffering timeout issue. The key improvements are:
- Better connection options
- Connection state checking
- Proper error handling
- Connection retry logic
