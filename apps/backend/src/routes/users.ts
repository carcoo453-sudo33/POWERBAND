import { Router } from 'express';
import { z } from 'zod';
import { userService } from '../services/userService';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Validation schema
const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

// Get user profile (authenticated)
router.get('/profile', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await userService.getUserById(req.user!.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// Update user (authenticated)
router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    // Check if user is updating their own profile or is admin
    if (req.user!.id !== req.params.id && req.user!.role !== 'admin') {
      throw new AppError('Not authorized to update this user', 403);
    }

    const data = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(req.params.id, data);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Delete user (authenticated)
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    // Check if user is deleting their own account or is admin
    if (req.user!.id !== req.params.id && req.user!.role !== 'admin') {
      throw new AppError('Not authorized to delete this user', 403);
    }

    await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
