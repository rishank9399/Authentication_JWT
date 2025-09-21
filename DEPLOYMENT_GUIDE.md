# Authentication JWT - Production Deployment Guide

## Issues Fixed for Production

### 1. Cookie Configuration
- Added `secure: true` for HTTPS in production
- Added `sameSite: 'none'` for cross-site requests
- Added `domain` configuration for production domains
- Added `maxAge` for proper cookie expiration

### 2. CORS Configuration
- Updated to handle multiple origins properly
- Added proper preflight handling
- Added production domain support

### 3. Error Handling
- Added comprehensive error handling in controllers
- Added detailed logging for debugging
- Added proper HTTP status codes

### 4. Axios Configuration
- Centralized API configuration
- Added request/response interceptors
- Added automatic error handling

## Environment Setup

### Server Environment Variables
Create `server/.env` file:
```env
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb://localhost:27017/authentication_jwt
TOKEN_KEY=your_super_secret_jwt_key_here_make_it_long_and_secure
CORS_ORIGIN_SITE=https://your-frontend-domain.com
COOKIE_DOMAIN=.your-domain.com
```

### Client Environment Variables
Create `client/.env` file:
```env
REACT_APP_API_BASE_URL=https://your-backend-domain.com
```

## Production Deployment Steps

### 1. Backend Deployment
1. Set up your production server (VPS, AWS, Heroku, etc.)
2. Install Node.js and MongoDB
3. Clone your repository
4. Install dependencies: `npm install`
5. Create `.env` file with production values
6. Start the server: `npm start`

### 2. Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Ensure your hosting service serves the app over HTTPS

### 3. Domain Configuration
- Update `CORS_ORIGIN_SITE` with your frontend domain
- Update `COOKIE_DOMAIN` with your domain (use `.yourdomain.com` for subdomains)
- Ensure both frontend and backend are served over HTTPS

### 4. MongoDB Setup
- Use MongoDB Atlas for production or set up a production MongoDB instance
- Update `MONGO_URL` with your production database connection string

## Important Notes

1. **HTTPS Required**: Both frontend and backend must use HTTPS in production
2. **Domain Matching**: Ensure cookie domain matches your actual domain
3. **CORS Origins**: Add your production frontend URL to CORS origins
4. **JWT Secret**: Use a strong, unique JWT secret key
5. **Environment Variables**: Never commit `.env` files to version control

## Testing Production Setup

1. Deploy both frontend and backend
2. Test user registration
3. Test user login
4. Test protected route access
5. Test logout functionality
6. Check browser developer tools for any CORS or cookie errors

## Troubleshooting

### Common Issues:
1. **Cookies not being set**: Check HTTPS, domain, and sameSite settings
2. **CORS errors**: Verify origin URLs in CORS configuration
3. **Token verification fails**: Check JWT secret and token expiration
4. **Redirect loops**: Check cookie verification logic

### Debug Steps:
1. Check browser developer tools console for errors
2. Check network tab for failed requests
3. Check server logs for detailed error messages
4. Verify environment variables are set correctly
