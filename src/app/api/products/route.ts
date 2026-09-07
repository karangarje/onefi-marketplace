import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            emiPlans: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    // Transform products with computed starting price, thumbnail, and lowest EMI
    const formattedProducts = products.map((product) => {
      let minPrice = Infinity;
      let minMrp = Infinity;
      let minMonthlyPayment = Infinity;
      let thumbnail = '';
      const colorsSet = new Set<string>();
      const storagesSet = new Set<string>();

      product.variants.forEach((v) => {
        const numPrice = v.price.toNumber();
        const numMrp = v.mrp.toNumber();
        colorsSet.add(v.color);
        storagesSet.add(v.storage);

        if (numPrice < minPrice) {
          minPrice = numPrice;
          minMrp = numMrp;
          thumbnail = v.image;
        }

        v.emiPlans.forEach((plan) => {
          const numMonthly = plan.monthlyPayment.toNumber();
          if (numMonthly < minMonthlyPayment) {
            minMonthlyPayment = numMonthly;
          }
        });
      });

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        startingPrice: minPrice === Infinity ? 0 : minPrice,
        startingMrp: minMrp === Infinity ? 0 : minMrp,
        lowestMonthlyPayment: minMonthlyPayment === Infinity ? undefined : minMonthlyPayment,
        thumbnail: thumbnail || '',
        availableColors: Array.from(colorsSet),
        availableStorages: Array.from(storagesSet),
        variantCount: product.variants.length,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: formattedProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error in GET /api/products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products from database',
      },
      { status: 500 }
    );
  }
}
