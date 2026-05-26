import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import userRoutes from './routes/users';
import orderRoutes from './routes/orders';
import reviewRoutes from './routes/reviews';

// Import middleware
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'POWERBAND Backend API', version: '1.0.0' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('[v0] Connected to database');

    app.listen(PORT, () => {
      console.log(`[v0] Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[v0] Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('[v0] Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

export { app, prisma };
