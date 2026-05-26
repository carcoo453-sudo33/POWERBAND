import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export class ProductService {
  async getProducts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  async createProduct(
    userId: string,
    data: {
      name: string;
      description?: string;
      price: number;
      image?: string;
      category?: string;
    }
  ) {
    if (!data.name || data.price < 0) {
      throw new AppError('Invalid product data', 400);
    }

    return prisma.product.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateProduct(
    id: string,
    userId: string,
    data: any
  ) {
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.userId !== userId) {
      throw new AppError('Not authorized to update this product', 403);
    }

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string, userId: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.userId !== userId) {
      throw new AppError('Not authorized to delete this product', 403);
    }

    await prisma.product.delete({ where: { id } });
  }
}

export const productService = new ProductService();
