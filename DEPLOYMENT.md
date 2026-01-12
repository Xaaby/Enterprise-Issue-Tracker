# Deployment Guide

## Overview

This application is deployed using:
- **Neon** (PostgreSQL database) - Free tier
- **Render** (Spring Boot backend) - Free tier
- **Netlify** (Angular frontend) - Free tier

---

## Step 1: Setup PostgreSQL on Neon

1. Go to [Neon Console](https://neon.tech)
2. Create a new project
3. Copy the connection string (it looks like):
   ```
   postgresql://user:password@host/dbname?sslmode=require
   ```
4. Keep these values handy:
   - Host
   - Database name
   - Username
   - Password

---

## Step 2: Deploy Backend on Render

### Option A: Using Docker (Recommended)

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Service**
   - **Name**: `issue-tracker-backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Docker Context**: `backend`

3. **Set Environment Variables**
   ```
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:postgresql://your-neon-host/dbname?sslmode=require
   SPRING_DATASOURCE_USERNAME=your-neon-username
   SPRING_DATASOURCE_PASSWORD=your-neon-password
   CORS_ALLOWED_ORIGINS=https://your-netlify-app.netlify.app
   PORT=8080
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete
   - Copy the public URL (e.g., `https://issue-tracker-api.onrender.com`)

### Option B: Using render.yaml

1. Push `backend/render.yaml` to your repository
2. Render will automatically detect and use it
3. Still need to set environment variables in Render dashboard

---

## Step 3: Deploy Frontend on Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `frontend/dist/issue-tracker`

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     API_BASE_URL=https://issue-tracker-api.onrender.com/api
     ```
   - Note: You'll need to update `environment.prod.ts` to use this, or use Netlify's build-time replacement

4. **Update environment.prod.ts**
   - Before deploying, update `frontend/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://issue-tracker-api.onrender.com/api'
   };
   ```
   - Replace with your actual Render backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be available at `https://your-app-name.netlify.app`

---

## Step 4: Update CORS Configuration

After deploying frontend, update backend CORS:

1. Go to Render dashboard → Your backend service → Environment
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://your-app-name.netlify.app
   ```
3. Redeploy backend (or it will auto-redeploy)

---

## Troubleshooting

### Backend Issues

**Problem**: Build fails
- **Solution**: Check Dockerfile path and context are correct
- **Solution**: Ensure PostgreSQL driver is in pom.xml

**Problem**: Database connection fails
- **Solution**: Verify Neon connection string is correct
- **Solution**: Check SSL mode is set to `require` in connection string

**Problem**: CORS errors
- **Solution**: Verify `CORS_ALLOWED_ORIGINS` includes your Netlify URL
- **Solution**: Check backend logs for CORS configuration

### Frontend Issues

**Problem**: API calls fail
- **Solution**: Verify `API_BASE_URL` environment variable is set
- **Solution**: Check browser console for CORS errors
- **Solution**: Ensure backend URL in `environment.prod.ts` matches Render URL

**Problem**: Build fails
- **Solution**: Check Node version (should be 18+)
- **Solution**: Run `npm ci` locally to check for dependency issues

---

## Environment Variables Summary

### Render (Backend)
- `SPRING_PROFILES_ACTIVE=prod`
- `SPRING_DATASOURCE_URL` (from Neon)
- `SPRING_DATASOURCE_USERNAME` (from Neon)
- `SPRING_DATASOURCE_PASSWORD` (from Neon)
- `CORS_ALLOWED_ORIGINS` (your Netlify URL)
- `PORT=8080`

### Netlify (Frontend)
- `API_BASE_URL` (your Render backend URL + `/api`)

---

## Post-Deployment Checklist

- [ ] Backend is accessible at Render URL
- [ ] Frontend is accessible at Netlify URL
- [ ] Frontend can call backend APIs (check browser console)
- [ ] Database connection works (create an issue to test)
- [ ] CORS is configured correctly
- [ ] All environment variables are set

---

## Notes

- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Neon free tier has connection limits
- Netlify free tier has build time limits
