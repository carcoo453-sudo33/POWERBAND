# POWERBAND - Quick Start Guide

Get up and running in 5 minutes!

## 1. Clone & Install

```bash
# Install dependencies for the entire monorepo
bun install
```

## 2. Configure Environment

### Backend Setup

Create `apps/backend/.env`:

```env
# MongoDB Atlas Connection
# Get this from MongoDB Atlas: https://cloud.mongodb.com
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/powerband?retryWrites=true&w=majority

# Server Configuration
NODE_ENV=development
PORT=3001

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-this-in-production-12345
JWT_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend Setup

Create `apps/frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=POWERBAND
```

## 3. Initialize Database

```bash
cd apps/backend

# Generate Prisma client
bun run prisma:generate

# Sync schema with MongoDB
bun run prisma:migrate

# Optional: Seed database with sample data
bun run prisma:seed
```

## 4. Start Development Servers

### Option A: Start Both (Recommended)

From the root directory:
```bash
bun run dev
```

This starts:
- Frontend on **http://localhost:5173**
- Backend on **http://localhost:3001**

### Option B: Start Individually

**Terminal 1 - Frontend:**
```bash
cd apps/frontend
bun run dev
```

**Terminal 2 - Backend:**
```bash
cd apps/backend
bun run dev
```

## 5. Verify Everything Works

### Check Frontend
- Open http://localhost:5173 in your browser
- You should see the landing page

### Check Backend
- Open http://localhost:3001/health in your browser
- You should see `{"status":"ok",...}`

### Test API
```bash
# Register a user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Response should include user data and JWT token
```

## 6. Next Steps

1. **Connect Frontend to Backend**
   - Update forms to call API endpoints
   - Store JWT token in localStorage
   - Add axios/fetch interceptor for auth

2. **Add Features**
   - Product listing page
   - User authentication UI
   - Shopping cart
   - Checkout flow

3. **Deploy**
   - Frontend: Vercel
   - Backend: Railway, Render, or Heroku
   - Database: MongoDB Atlas (already cloud-hosted)

## Troubleshooting

### "Cannot connect to MongoDB"
- [ ] Check `DATABASE_URL` in `apps/backend/.env`
- [ ] Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
- [ ] Test connection: `mongosh "your_connection_string"`

### "Port 3001 already in use"
```bash
# Kill the process
lsof -ti:3001 | xargs kill -9

# Or change the port in apps/backend/.env
PORT=3002
```

### "Frontend cannot reach backend"
- [ ] Backend is running on port 3001
- [ ] `VITE_API_URL=http://localhost:3001` in frontend `.env`
- [ ] Check CORS_ORIGIN matches frontend URL

### "Prisma types not found"
```bash
cd apps/backend
bun run prisma:generate
```

## File Structure Reference

```
POWERBAND/
├── apps/
│   ├── frontend/          # React app
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── backend/           # Express API
│       ├── src/
│       │   ├── routes/    # API endpoints
│       │   ├── services/  # Business logic
│       │   └── server.ts
│       ├── prisma/
│       │   └── schema.prisma
│       └── package.json
│
├── packages/
│   └── shared/            # Shared types
│       └── src/
│           └── types/
│
└── package.json           # Root monorepo
```

## Available Scripts

### From Root
```bash
bun run dev              # Start frontend + backend
bun run build            # Build both apps
bun run lint             # Lint frontend code
bun run test             # Run frontend tests
```

### Frontend Only
```bash
cd apps/frontend
bun run dev              # Start Vite server
bun run build            # Production build
bun run preview          # Preview build
bun run test             # Run tests
```

### Backend Only
```bash
cd apps/backend
bun run dev              # Start with file watching
bun run build            # Compile TypeScript
bun run start            # Run compiled JS
bun run prisma:generate  # Generate Prisma client
bun run prisma:migrate   # Run migrations
```

## API Documentation

See `MONOREPO.md` for complete API endpoint reference.

## Getting Help

1. Check `MONOREPO.md` for detailed architecture
2. Look at example route files in `apps/backend/src/routes/`
3. Check Prisma docs: https://www.prisma.io/docs
4. Check Express docs: https://expressjs.com/

Happy coding! 🚀
