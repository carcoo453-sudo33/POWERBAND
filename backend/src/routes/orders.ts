import { Router } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router: any = Router();
const prisma = new PrismaClient();

// Validation schema
const createOrderSchema = z.object({
  productIds: z.array(z.string()),
  total: z.number().positive(),
});

// Get user's orders (authenticated)
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: req.user!.id },
        skip,
        take: limit,
        include: {
          products: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({
        where: { userId: req.user!.id },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get order by ID (authenticated)
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        products: true,
      },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    if (order.userId !== req.user!.id) {
      throw new AppError('Not authorized to view this order', 403);
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

// Create order (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { productIds, total } = createOrderSchema.parse(req.body);

    // Verify products exist
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new AppError('Some products not found', 400);
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user!.id,
        total,
        products: {
          connect: productIds.map((id) => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Update order status (authenticated)
router.patch('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    if (order.userId !== req.user!.id && req.user!.role !== 'admin') {
      throw new AppError('Not authorized to update this order', 403);
    }

    const { status } = req.body;
    if (!status) {
      throw new AppError('Status is required', 400);
    }

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        products: true,
      },
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
