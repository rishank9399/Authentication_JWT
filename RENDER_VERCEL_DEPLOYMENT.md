# Render + Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Backend Deployment on Render

1. **Push your code to GitHub** (make sure all changes are committed)

2. **Go to Render.com** and sign up/login

3. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select the `server` folder as the root directory
   - Choose Node.js as the environment
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node

4. **Set Environment Variables in Render**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/authentication_jwt
   TOKEN_KEY=your_super_secret_jwt_key_here_make_it_long_and_secure_at_least_32_characters
   CORS_ORIGIN_SITE=https://your-vercel-app.vercel.app
   COOKIE_DOMAIN=.vercel.app
   ```

5. **Deploy** - Render will automatically deploy your backend

### 2. Frontend Deployment on Vercel

1. **Go to Vercel.com** and sign up/login

2. **Import your GitHub repository**:
   - Select the `client` folder as the root directory
   - Vercel will auto-detect it's a React app

3. **Set Environment Variables in Vercel**:
   ```
   REACT_APP_API_BASE_URL=https://your-render-app.onrender.com
   ```

4. **Deploy** - Vercel will automatically build and deploy your frontend

## 🔧 Environment Variables Setup

### Backend (Render) Environment Variables:
```env
NODE_ENV=production
PORT=10000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/authentication_jwt
TOKEN_KEY=your_super_secret_jwt_key_here_make_it_long_and_secure_at_least_32_characters
CORS_ORIGIN_SITE=https://your-vercel-app.vercel.app
COOKIE_DOMAIN=.vercel.app
```

### Frontend (Vercel) Environment Variables:
```env
REACT_APP_API_BASE_URL=https://your-render-app.onrender.com
```

## 📝 Important Notes

### MongoDB Setup:
1. **Use MongoDB Atlas** (free tier available)
2. **Create a cluster** and get your connection string
3. **Replace** `username`, `password`, and `cluster` in the MONGO_URL
4. **Whitelist all IPs** (0.0.0.0/0) in MongoDB Atlas network access

### JWT Secret:
- **Generate a strong secret**: Use at least 32 characters
- **Example**: `mySuperSecretJWTKeyForAuthentication2024!@#$%^&*()`

### Domain Configuration:
- **Backend URL**: `https://your-render-app.onrender.com`
- **Frontend URL**: `https://your-vercel-app.vercel.app`
- **Update CORS_ORIGIN_SITE** with your actual Vercel URL
- **Update REACT_APP_API_BASE_URL** with your actual Render URL

## 🧪 Testing After Deployment

1. **Test Backend**: Visit `https://your-render-app.onrender.com` - should show connection
2. **Test Frontend**: Visit `https://your-vercel-app.vercel.app`
3. **Test Registration**: Create a new account
4. **Test Login**: Login with created account
5. **Test Protected Route**: Should stay on home page after login
6. **Test Logout**: Should clear session and redirect to login

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check if CORS_ORIGIN_SITE matches your Vercel URL exactly
   - Ensure both URLs use HTTPS

2. **Cookie Issues**:
   - Verify COOKIE_DOMAIN is set to `.vercel.app`
   - Check browser console for cookie errors

3. **MongoDB Connection**:
   - Verify MONGO_URL is correct
   - Check MongoDB Atlas network access settings

4. **Environment Variables**:
   - Double-check all environment variables are set correctly
   - Restart services after changing environment variables

### Debug Steps:
1. Check Render logs for backend errors
2. Check Vercel function logs for frontend errors
3. Check browser developer tools console
4. Verify all environment variables are set

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed on Render with all environment variables
- [ ] Frontend deployed on Vercel with environment variables
- [ ] CORS_ORIGIN_SITE updated with actual Vercel URL
- [ ] REACT_APP_API_BASE_URL updated with actual Render URL
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test protected routes
- [ ] Test logout functionality

Your authentication system should now work perfectly in production! 🎉
