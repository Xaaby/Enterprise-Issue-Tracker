# Frontend Deployment on Netlify

## Quick Start

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Add new site → Import from Git
   - Connect GitHub repository

2. **Configure Build**
   - **Base directory**: `frontend`
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `frontend/dist/issue-tracker`

3. **Set Environment Variable**
   - Site settings → Environment variables
   - Add: `API_BASE_URL` = `https://your-render-backend.onrender.com/api`

4. **Update environment.prod.ts**
   - Before deploying, update the API URL in `src/environments/environment.prod.ts`
   - Replace `https://issue-tracker-api.onrender.com/api` with your actual Render backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

## Build Configuration

Netlify will use `netlify.toml` for configuration:
- Build command: `npm ci && npm run build`
- Publish directory: `dist/issue-tracker`
- Redirects: All routes → `index.html` (for Angular routing)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_BASE_URL` | Backend API URL | `https://api.onrender.com/api` |

Note: Angular environment files are replaced at build time. Update `environment.prod.ts` with your backend URL before deploying.

## Troubleshooting

**Build fails**: Check Node version (should be 18+)
**API calls fail**: Verify `API_BASE_URL` in environment.prod.ts
**Routing doesn't work**: Check `netlify.toml` redirects configuration
