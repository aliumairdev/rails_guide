# Quick Railway Setup Guide

## Your Project Structure

Your project is a **React + Vite frontend** with a **Node.js/Express backend** that executes Ruby code.

- Frontend: React 18 + Vite (builds to `frontend/dist`)
- Backend: Node.js + Express (requires Ruby 3.2+ installed)

## Recommended: Deploy as Two Separate Services

This is the **easiest and cleanest** approach for your project.

### Why Two Services?

1. Matches your development setup (frontend on 5173, backend on 3001)
2. No code changes needed
3. Frontend gets CDN caching
4. Easier to debug and scale independently

### Quick Steps

#### 1. Deploy Backend First

```bash
# In Railway dashboard:
1. Create new project from GitHub
2. Set root directory to: backend
3. Add environment variable: NODE_ENV=production
4. Copy the deployed URL (e.g., https://backend-xxx.railway.app)
```

#### 2. Deploy Frontend Second

```bash
# In Railway dashboard:
1. Add new service to same project
2. Set root directory to: frontend
3. Add environment variable: VITE_API_URL=<your-backend-url>
4. Railway will build and serve the frontend automatically
```

#### 3. Update Frontend Code

You need to tell the frontend where the backend API is. Check your frontend code for API calls and ensure it uses the environment variable.

**Example:** If you're using axios, update your API base URL:

```javascript
// In frontend/src/App.jsx or wherever you make API calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Then use it in your axios calls
axios.post(`${API_URL}/api/execute`, { code });
```

---

## Alternative: Single Service (Requires Code Changes)

If you want to save costs and deploy as one service:

### What You Need to Do

1. **Update `backend/server.js`** - Add code to serve the built frontend
2. **Update frontend API calls** - Use relative URLs instead of localhost:3001
3. **Deploy** - Railway builds frontend, backend serves everything

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on this approach.

---

## Files Included

### For Two-Service Deployment:
- `railway-backend.json` - Backend service config
- `railway-frontend.json` - Frontend service config

### For Single-Service Deployment:
- `railway.json` - Combined service config
- `nixpacks.toml` - Build instructions
- `Procfile` - Start command

---

## Which Config Files Are Correct?

**Answer:** Both approaches work, but they serve different purposes:

### Current Configuration Status

✅ **`nixpacks.toml`** - Correct for single-service deployment
- Installs Node.js and Ruby
- Builds frontend
- Starts backend

✅ **`railway.json`** - Correct for single-service deployment

✅ **`Procfile`** - Correct for single-service deployment

✅ **`railway-backend.json`** - Correct for two-service deployment (backend)

✅ **`railway-frontend.json`** - Correct for two-service deployment (frontend)

**All configs are correct** - just choose which deployment approach you want!

---

## My Recommendation

**Start with Two-Service Deployment** because:
1. No code changes needed
2. Faster to deploy
3. Easier to debug
4. More flexible

You can always consolidate to single-service later if needed.

---

## Need Help?

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete step-by-step instructions for both approaches.
