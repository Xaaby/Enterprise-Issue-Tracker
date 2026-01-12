# Backend Deployment on Render

## Quick Start

1. **Create Neon PostgreSQL Database**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy connection string

2. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - New → Web Service
   - Connect GitHub repo
   - Configure:
     - **Name**: `issue-tracker-backend`
     - **Environment**: `Docker`
     - **Dockerfile Path**: `backend/Dockerfile`
     - **Docker Context**: `backend`

3. **Set Environment Variables**
   ```
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:postgresql://your-neon-host/dbname?sslmode=require
   SPRING_DATASOURCE_USERNAME=your-username
   SPRING_DATASOURCE_PASSWORD=your-password
   CORS_ALLOWED_ORIGINS=https://your-netlify-app.netlify.app
   PORT=8080
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build (5-10 minutes first time)
   - Copy public URL

## Docker Build

The Dockerfile uses multi-stage build:
- Stage 1: Maven build
- Stage 2: JRE runtime

Build locally:
```bash
cd backend
docker build -t issue-tracker-backend .
docker run -p 8080:8080 issue-tracker-backend
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Spring profile | `prod` |
| `SPRING_DATASOURCE_URL` | PostgreSQL connection string | `jdbc:postgresql://...` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `neondb_owner` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `your-password` |
| `CORS_ALLOWED_ORIGINS` | Frontend URL(s) | `https://app.netlify.app` |
| `PORT` | Server port | `8080` |

## Troubleshooting

**Build fails**: Check Dockerfile path and context
**Database connection fails**: Verify Neon connection string
**CORS errors**: Check `CORS_ALLOWED_ORIGINS` includes frontend URL
