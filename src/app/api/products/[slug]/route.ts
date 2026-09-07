import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawSlug = resolvedParams.slug;
    const isNumeric = /^\d+$/.test(rawSlug);
    const slugList =
      rawSlug === 'samsung-s24-ultra' || rawSlug === 'samsung-galaxy-s24-ultra'
        ? ['samsung-galaxy-s24-ultra', 'samsung-s24-ultra']
        : [rawSlug];

    const product = await prisma.product.findFirst({
      where: isNumeric
        ? { OR: [{ id: parseInt(rawSlug, 10) }, { slug: { in: slugList } }] }
        : { slug: { in: slugList } },
      include: {
        variants: {
          orderBy: {
            price: 'asc',
          },
          include: {
            emiPlans: {
              orderBy: {
                tenure: 'asc',
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product with slug '${rawSlug}' was not found`,
        },
        { status: 404 }
      );
    }

    // Format Prisma Decimals into clean numbers for JSON transmission
    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      description: product.description,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        productId: variant.productId,
        color: variant.color,
        storage: variant.storage,
        mrp: variant.mrp.toNumber(),
        price: variant.price.toNumber(),
        image: variant.image,
        emiPlans: variant.emiPlans.map((plan) => ({
          id: plan.id,
          variantId: plan.variantId,
          monthlyPayment: plan.monthlyPayment.toNumber(),
          tenure: plan.tenure,
          interestRate: plan.interestRate.toNumber(),
          cashback: plan.cashback.toNumber(),
          createdAt: plan.createdAt.toISOString(),
          updatedAt: plan.updatedAt.toISOString(),
        })),
      })),
    };

    return NextResponse.json(
      {
        success: true,
        data: formattedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in GET /api/products/[slug]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product details from database',
      },
      { status: 500 }
    );
  }
}
