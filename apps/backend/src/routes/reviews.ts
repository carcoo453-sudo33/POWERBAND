import { Router } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
const prisma = new PrismaClient();

// Validation schema
const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Get reviews for a product
router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: req.params.productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

// Create review (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { productId, rating, comment } = createReviewSchema.parse(req.body);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: req.user!.id,
        },
      },
    });

    if (existingReview) {
      throw new AppError('You have already reviewed this product', 409);
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: req.user!.id,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Update review (authenticated)
router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
    });

    if (!review) {
      throw new AppError('Review not found', 404);
    }

    if (review.userId !== req.user!.id) {
      throw new AppError('Not authorized to update this review', 403);
    }

    const { rating, comment } = createReviewSchema.partial().parse(req.body);

    const updated = await prisma.review.update({
      where: { id: req.params.id },
      data: {
        ...(rating !== undefined && { rating }),
        ...(comment !== undefined && { comment }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Delete review (authenticated)
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
    });

    if (!review) {
      throw new AppError('Review not found', 404);
    }

    if (review.userId !== req.user!.id && req.user!.role !== 'admin') {
      throw new AppError('Not authorized to delete this review', 403);
    }

    await prisma.review.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
