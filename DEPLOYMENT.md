# Deployment Guide - Render

## 🚀 Deploy to Render (Recommended)

### Prerequisites
- GitHub repository with your code
- Render account (free tier available)
- MongoDB Atlas database

### Step 1: Prepare Environment Variables
You'll need these environment variables in Render:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
SECRET_KEY=your-jwt-secret-key
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
NODE_ENV=production
```

### Step 2: Deploy on Render

1. **Go to [render.com](https://render.com) and sign up/login**

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository: `MandelaIFS`

3. **Configure the service:**
   - **Name:** `mandela-international-school`
   - **Environment:** `Node`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for better performance)

4. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all the environment variables listed above

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)

### Step 3: Update Frontend Configuration

After deployment, you'll get a URL like: `https://mandela-international-school.onrender.com`

The frontend is served from the same domain, so no additional configuration needed!

### 🎉 That's it!

Your full-stack application will be available at your Render URL, with:
- Backend API at: `https://your-app.onrender.com/api/v1/`
- Frontend at: `https://your-app.onrender.com/`
- Custom 404 page working properly

### 🔧 Troubleshooting

- **Build fails:** Check the build logs in Render dashboard
- **Database connection issues:** Verify MONGODB_URI is correct
- **CORS errors:** The app is configured to serve frontend and backend from same domain