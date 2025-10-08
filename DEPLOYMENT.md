# AEXIS Deployment Guide

## Overview

AEXIS is deployed with a split architecture:

- **Frontend**: Netlify (React + Vite)
- **Backend**: Railway (FastAPI + Python)
- **Database**: Supabase (PostgreSQL)

## Deployment URL

### Production

- **Frontend**: https://aexis.netlify.app/
- **Backend API**: https://aexis-production.up.railway.app/
- **API Docs**: https://aexis-production.up.railway.app/docs

## Configuration

### Frontend (Netlify)

Environment variables set in `netlify.toml`:

- `VITE_API_URL`: https://aexis-production.up.railway.app
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

**Note**: Make sure to also set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify's dashboard under Site Settings > Environment Variables.

### Backend (Railway)

The backend is automatically deployed from the `main` branch using Railway's Nixpacks builder.

Environment variables (if needed):

- Automatically uses `$PORT` provided by Railway

### CORS Configuration

The backend allows requests from:

- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local)
- `https://aexis.netlify.app` (production)

## How It Works

1. **Frontend deployment**:

   - Push to GitHub triggers Netlify build
   - Vite builds the React app with environment variables
   - Built files deployed to Netlify CDN

2. **Backend deployment**:

   - Push to GitHub triggers Railway build
   - Nixpacks builds Python environment
   - FastAPI server runs on Railway

3. **API Communication**:
   - Frontend calls `VITE_API_URL` endpoints
   - Backend responds with JSON data
   - CORS headers allow cross-origin requests

## Testing

### Test Backend

```bash
curl https://aexis-production.up.railway.app/health
```

### Test Frontend

Visit: https://aexis.netlify.app/

## Updating Deployments

### Frontend

```bash
git add .
git commit -m "Your message"
git push
```

Netlify will automatically rebuild and deploy.

### Backend

```bash
git add .
git commit -m "Your message"
git push
```

Railway will automatically rebuild and deploy.

## Troubleshooting

### Frontend not connecting to backend

1. Check browser console for CORS errors
2. Verify `VITE_API_URL` is set correctly in Netlify
3. Ensure backend CORS allows your Netlify domain

### Backend errors

1. Check Railway logs in Railway dashboard
2. Test backend endpoints directly: https://aexis-production.up.railway.app/docs
3. Verify all dependencies in `requirements.txt`

### Build failures

1. **Netlify**: Check build logs in Netlify dashboard
2. **Railway**: Check deployment logs in Railway dashboard

## Local Development

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `POST /api/predict` - Predict exoplanet from light curve data
- `POST /api/train` - Train model with configuration
- `GET /api/metrics` - Get current model metrics
- `GET /api/sample-data` - Get sample light curve data

## Security Notes

- Supabase anon keys are safe to expose in frontend (protected by RLS)
- Backend uses CORS to restrict which domains can call it
- No sensitive data should be committed to the repository
