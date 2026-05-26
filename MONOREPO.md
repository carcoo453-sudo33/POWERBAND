# POWERBAND - Monorepo Architecture

This is a monorepo using **bun workspaces** containing a **React frontend** and **Express.js backend** with **Prisma ORM** connected to **MongoDB**.

## Directory Structure

```
POWERBAND/
├── apps/
│   ├── frontend/              # Vite + React frontend app
│   │   ├── src/               # React components, pages, hooks
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── .env.example
│   │
│   └── backend/               # Express.js + Prisma backend
│       ├── src/
│       │   ├── routes/        # API endpoints
│       │   ├── services/      # Business logic
│       │   ├── middleware/    # Express middleware
│       │   ├── types/         # TypeScript types
│       │   └── server.ts      # Express app
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       ├── package.json
│       └── .env.example
│
├── packages/
│   └── shared/                # Shared types package
│       ├── src/
│       │   ├── types/         # Shared TypeScript types
│       │   └── index.ts
│       └── package.json
│
└── package.json               # Root monorepo configuration
```

## Setup

### Prerequisites
- **Node.js** 18+ or **Bun** (this project uses Bun)
- **MongoDB Atlas** account (free tier available)

### 1. Install Dependencies

```bash
# Install all dependencies for the monorepo
bun install
```

This installs dependencies for:
- Root monorepo
- `apps/frontend`
- `apps/backend`
- `packages/shared`

### 2. Environment Configuration

#### Backend Environment
Create `apps/backend/.env` from `apps/backend/.env.example`:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/powerband?retryWrites=true&w=majority
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Environment
Create `apps/frontend/.env` from `apps/frontend/.env.example`:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=POWERBAND
```

### 3. Initialize Database

```bash
# Generate Prisma client
cd apps/backend
bun run prisma:generate

# Push schema to MongoDB
bun run prisma:migrate
```

## Development

### Start All Services
```bash
# From the root directory
bun run dev
```

This starts both frontend and backend in parallel:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health check**: http://localhost:3001/health

### Start Individual Services

**Frontend Only:**
```bash
cd apps/frontend
bun run dev
```

**Backend Only:**
```bash
cd apps/backend
bun run dev
```

## Build

```bash
# Build all apps
bun run build

# Build frontend only
bun run build:frontend

# Build backend only
bun run build:backend
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

### Users
- `GET /api/users/profile` - Get authenticated user profile
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (authenticated)
- `DELETE /api/users/:id` - Delete user (authenticated)

### Orders
- `GET /api/orders` - Get user's orders (authenticated)
- `GET /api/orders/:id` - Get order by ID (authenticated)
- `POST /api/orders` - Create order (authenticated)
- `PATCH /api/orders/:id` - Update order status (authenticated)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (authenticated)
- `PUT /api/reviews/:id` - Update review (authenticated)
- `DELETE /api/reviews/:id` - Delete review (authenticated)

## Database Schema

### User
```
- id (ObjectId)
- email (unique)
- password (hashed)
- name (optional)
- role (user, admin, vendor)
- createdAt
- updatedAt
```

### Product
```
- id (ObjectId)
- name
- description (optional)
- price
- image (optional)
- category (optional)
- inStock (default: true)
- userId (relationship to User)
- createdAt
- updatedAt
```

### Order
```
- id (ObjectId)
- userId (relationship to User)
- products (relationship to Product[])
- total
- status (pending, completed, cancelled)
- createdAt
- updatedAt
```

### Review
```
- id (ObjectId)
- productId (relationship to Product)
- userId (relationship to User)
- rating (1-5)
- comment (optional)
- createdAt
```

## Technologies

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router
- **Forms**: React Hook Form
- **Validation**: Zod

### Backend
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **CORS**: cors

### Shared
- **Language**: TypeScript
- **Purpose**: Shared types and constants between frontend and backend

## Development Workflow

### Adding Dependencies

**To entire monorepo:**
```bash
bun add package-name
```

**To specific workspace:**
```bash
cd apps/backend
bun add express
```

**To shared package:**
```bash
cd packages/shared
bun add zod
```

### Creating New API Routes

1. Create file in `apps/backend/src/routes/feature.ts`
2. Create corresponding service in `apps/backend/src/services/featureService.ts`
3. Import route in `apps/backend/src/server.ts`
4. Add types to `packages/shared/src/types/api.ts`

### Creating API Client Hook (Frontend)

```typescript
import axios from 'axios';
import { API_BASE_URL } from '@powerband/shared';

export const useApi = () => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  return client;
};
```

## Deployment

### Frontend (Vercel)
```bash
cd apps/frontend
# Push to Vercel or use Vercel CLI
vercel deploy
```

### Backend (Docker/Railway/Render)

**Using Docker:**
```bash
docker build -f Dockerfile.backend -t powerband-backend .
docker run -p 3001:3001 --env-file apps/backend/.env powerband-backend
```

**Environment variables to set:**
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - production
- `PORT` - 3001 (or your chosen port)

## Troubleshooting

### Prisma Client Not Found
```bash
cd apps/backend
bun run prisma:generate
```

### Database Connection Error
- Check `DATABASE_URL` in `apps/backend/.env`
- Ensure MongoDB Atlas IP whitelist allows your IP
- Test connection: `mongosh "your_connection_string"`

### CORS Issues
- Frontend: Ensure `VITE_API_URL` points to correct backend
- Backend: Check `CORS_ORIGIN` environment variable

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in apps/backend/.env
PORT=3002
```

## Next Steps

1. Set up MongoDB Atlas connection
2. Configure authentication flow in frontend
3. Create API client utilities
4. Build product listing and detail pages
5. Implement shopping cart
6. Add checkout functionality
7. Set up testing and CI/CD

## Contributing

1. Create feature branch from `main`
2. Make changes to frontend, backend, or shared
3. Test locally with `bun run dev`
4. Commit and push to feature branch
5. Create pull request

## License

MIT
