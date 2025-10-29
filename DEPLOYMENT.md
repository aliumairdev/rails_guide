# Deployment Guide - Railway

This guide explains how to deploy the Ruby & Rails Learning Platform to Railway.

## Prerequisites

- Railway account (sign up at https://railway.app)
- Railway CLI installed (optional, for CLI deployment)
- Git repository with your code

## Architecture

This application consists of:
- **Backend**: Node.js/Express server that executes Ruby code (port 3001 in dev)
- **Frontend**: React + Vite application (port 5173 in dev)

## Deployment Options

### Option 1: Two Separate Services (Recommended)

Deploy frontend and backend as separate Railway services. This matches your development setup.

**Advantages:**
- Matches development architecture
- Frontend can be cached on CDN
- Independent scaling
- Easier debugging

**Disadvantages:**
- Two services = higher cost
- Need to configure CORS

### Option 2: Single Service (Backend serves Frontend)

Build frontend and serve it from the backend.

**Advantages:**
- Single service = lower cost
- No CORS issues
- Simpler deployment

**Disadvantages:**
- Backend must be updated to serve static files
- Requires code changes

## Deployment Files

### For Option 1 (Two Services):
- `railway-backend.json` - Backend service configuration
- `railway-frontend.json` - Frontend service configuration

### For Option 2 (Single Service):
- `railway.json` - Combined service configuration
- `nixpacks.toml` - Build configuration
- `Procfile` - Process configuration

---

## OPTION 1: Deploy as Two Separate Services

### Step 1: Deploy Backend Service

1. **Create New Project in Railway**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Name it "ruby-learning-backend"

2. **Configure Backend Service**
   - Railway will detect it's a Node.js app
   - Go to Settings → Environment
   - Add environment variable:
     ```
     NODE_ENV=production
     ```

3. **Set Root Directory**
   - Go to Settings → Service
   - Set "Root Directory" to `backend`
   - Or rename `railway-backend.json` to `railway.json` temporarily

4. **Deploy**
   - Railway will automatically deploy
   - Copy the backend URL (e.g., `https://your-backend.railway.app`)

### Step 2: Deploy Frontend Service

1. **Add New Service to Same Project**
   - In your Railway project, click "New Service"
   - Select the same GitHub repository
   - Name it "ruby-learning-frontend"

2. **Configure Frontend Service**
   - Set "Root Directory" to `frontend`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```

3. **Add serve package**
   - The frontend needs a static file server
   - Railway will use `npx serve` (already configured in railway-frontend.json)

4. **Deploy**
   - Railway will build and deploy the frontend
   - Your app will be available at the generated URL

### Step 3: Update Frontend API Configuration

You need to update the frontend to use the backend URL. Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

Then update your axios configuration in the frontend to use `import.meta.env.VITE_API_URL`.

---

## OPTION 2: Deploy as Single Service

This requires updating the backend to serve the built frontend files.

### Step 1: Update Backend Server

Add the following code to `backend/server.js` (after the API routes, before `app.listen`):

```javascript
// Serve static files from the React app (production only)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // The "catchall" handler: for any request that doesn't match API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}
```

### Step 2: Deploy to Railway

1. **Create New Project**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository

2. **Configure Environment Variables**
   - Go to your service → Variables tab
   - Add:
     ```
     NODE_ENV=production
     ```
   - `PORT` is set automatically by Railway

3. **Deploy**
   - Railway will use `nixpacks.toml` and `railway.json` to:
     - Install Node.js and Ruby
     - Install dependencies for both frontend and backend
     - Build the frontend
     - Start the backend (which now serves the frontend)
   - Wait for deployment to complete

4. **Access Your App**
   - Click the generated URL to access your application

---

## Configuration Details

### Environment Variables

**Required:**
- `NODE_ENV=production` - Enables production mode

**Automatic:**
- `PORT` - Railway sets this automatically

### Ruby Installation

Railway's Nixpacks will install Ruby as specified in `nixpacks.toml`. The backend requires Ruby 3.2+ to execute user code.

## Monitoring

1. **View Logs**
   - Go to your service in Railway dashboard
   - Click "Deployments" tab
   - Click on any deployment to view logs

2. **Check Metrics**
   - View CPU, Memory, and Network usage in the "Metrics" tab

## Troubleshooting

### Build Failures

If the build fails:
1. Check the build logs in Railway dashboard
2. Ensure all dependencies are listed in `package.json`
3. Verify Ruby is available (check logs for Ruby installation)

### Runtime Errors

If the app crashes after deployment:
1. Check the runtime logs in Railway dashboard
2. Ensure environment variables are set correctly
3. Verify the PORT variable is being used correctly in your server

### Ruby Code Execution Issues

If Ruby code execution fails:
1. Verify Ruby is installed: check deployment logs
2. Ensure Ruby is in the PATH
3. Check that Ruby version is 3.2 or higher

## Custom Domain (Optional)

1. Go to your service in Railway
2. Click "Settings" tab
3. Scroll to "Domains"
4. Click "Generate Domain" for a Railway subdomain
5. Or add your custom domain

## Scaling

Railway automatically scales based on your plan:
- Free tier: Limited resources
- Hobby plan: More resources
- Pro plan: Full scaling capabilities

## Cost Optimization

- Railway charges based on usage
- Monitor your usage in the dashboard
- Consider using Railway's sleep mode for development environments

## Security Considerations

For production deployment, consider:

1. **Code Execution Security**
   - Add rate limiting for the `/api/execute` endpoint
   - Implement Docker containers for Ruby code execution
   - Add resource limits (CPU, memory, execution time)
   - Consider sandboxing solutions (firejail, nsjail)

2. **Authentication**
   - Add user authentication if needed
   - Protect sensitive endpoints

3. **Input Validation**
   - Sanitize user code input
   - Validate all API requests

## Support

If you encounter issues:
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: Check the GitHub issues page

## Useful Commands

```bash
# View logs
railway logs

# Check service status
railway status

# Open in browser
railway open

# Connect to service shell
railway shell

# View environment variables
railway variables
```

## Next Steps After Deployment

1. Test all functionality on the deployed app
2. Configure custom domain (optional)
3. Set up monitoring and alerts
4. Implement additional security measures
5. Add analytics (optional)

---

Happy Deploying! 🚀
