import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const url = new URL(request.url);
    const variantIdParam = url.searchParams.get('variantId');

    // Find product by slug or by numeric id
    const isNumeric = /^\d+$/.test(slug);
    const slugList =
      slug === 'samsung-s24-ultra' || slug === 'samsung-galaxy-s24-ultra'
        ? ['samsung-galaxy-s24-ultra', 'samsung-s24-ultra']
        : [slug];

    const product = await prisma.product.findFirst({
      where: isNumeric
        ? { OR: [{ id: parseInt(slug, 10) }, { slug: { in: slugList } }] }
        : { slug: { in: slugList } },
      include: {
        variants: {
          where: variantIdParam ? { id: parseInt(variantIdParam, 10) } : undefined,
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
          error: `Product '${slug}' was not found`,
        },
        { status: 404 }
      );
    }

    // Flatten EMI plans with applicable variant and product details
    const emiPlans = product.variants.flatMap((variant) =>
      variant.emiPlans.map((plan) => {
        const variantPrice = variant.price.toNumber();
        const cashback = plan.cashback.toNumber();
        return {
          id: plan.id,
          variantId: variant.id,
          productId: product.id,
          productName: product.name,
          variantName: `${variant.color} • ${variant.storage}`,
          color: variant.color,
          storage: variant.storage,
          variantPrice,
          variantMrp: variant.mrp.toNumber(),
          tenure: plan.tenure,
          monthlyPayment: plan.monthlyPayment.toNumber(),
          interestRate: plan.interestRate.toNumber(),
          cashback,
          effectivePrice: Math.max(0, variantPrice - cashback),
          createdAt: plan.createdAt.toISOString(),
          updatedAt: plan.updatedAt.toISOString(),
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
        },
        count: emiPlans.length,
        data: emiPlans,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in GET /api/products/[slug]/emi-plans:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch EMI plans from database',
      },
      { status: 500 }
    );
  }
}
