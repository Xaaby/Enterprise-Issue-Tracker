# Deployment Quick Start

## 🚀 Three-Step Deployment

### 1️⃣ Neon (PostgreSQL) - 2 minutes
1. Sign up: https://neon.tech
2. Create project → Copy connection string
3. Save: Host, Database, Username, Password

### 2️⃣ Render (Backend) - 5 minutes
1. Go to: https://dashboard.render.com
2. New → Web Service → Connect GitHub
3. Settings:
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Docker Context**: `backend`
4. Environment Variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:postgresql://[neon-host]/[db]?sslmode=require
   SPRING_DATASOURCE_USERNAME=[neon-user]
   SPRING_DATASOURCE_PASSWORD=[neon-pass]
   CORS_ALLOWED_ORIGINS=https://your-app.netlify.app
   ```
5. Deploy → Copy URL (e.g., `https://issue-tracker-api.onrender.com`)

### 3️⃣ Netlify (Frontend) - 3 minutes
1. Go to: https://app.netlify.com
2. Add site → Import from Git → Select repo
3. Settings:
   - **Base directory**: `frontend`
   - **Build**: `npm ci && npm run build`
   - **Publish**: `frontend/dist/issue-tracker`
4. **IMPORTANT**: Update `frontend/src/environments/environment.prod.ts`:
   ```typescript
   apiUrl: 'https://your-render-url.onrender.com/api'
   ```
5. Deploy → Copy URL (e.g., `https://your-app.netlify.app`)

### 4️⃣ Update CORS
1. Go back to Render dashboard
2. Update `CORS_ALLOWED_ORIGINS` with your Netlify URL
3. Redeploy backend

## ✅ Done!

Your app is live at: `https://your-app.netlify.app`

---

## 🔧 Common Issues

**Backend won't start**: Check Neon connection string format
**CORS errors**: Verify `CORS_ALLOWED_ORIGINS` matches Netlify URL exactly
**Frontend can't connect**: Check `environment.prod.ts` has correct backend URL
