import { Router } from 'express';
import { z } from 'zod';
import { productService } from '../services/productService';
import { authenticate, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  image: z.string().optional(),
  category: z.string().optional(),
});

const updateProductSchema = createProductSchema.partial();

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const result = await productService.getProducts(page, limit);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

// Create product (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(req.user!.id, data);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Update product (authenticated)
router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const data = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(
      req.params.id,
      req.user!.id,
      data
    );

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Validation error', 400));
    }
    next(error);
  }
});

// Delete product (authenticated)
router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    await productService.deleteProduct(req.params.id, req.user!.id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
