import { Router } from 'express';
import { z } from 'zod';
import { authService } from '../services/authService';
import { AppError } from '../middleware/errorHandler';

const router: any = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Register endpoint
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const { user, token } = await authService.register(email, password, name);

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Login endpoint
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Verify token endpoint
router.post('/verify', async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new AppError('Token required', 400);
    }

    const decoded = await authService.verifyToken(token);
    res.status(200).json({
      success: true,
      data: decoded,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
