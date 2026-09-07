import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductDetailView } from '@/components/products/ProductDetailView';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugList =
    slug === 'samsung-s24-ultra' || slug === 'samsung-galaxy-s24-ultra'
      ? ['samsung-galaxy-s24-ultra', 'samsung-s24-ultra']
      : [slug];

  const product = await prisma.product.findFirst({
    where: { slug: { in: slugList } },
  });

  if (!product) {
    return {
      title: 'Product Not Found | 1Fi Marketplace',
    };
  }

  return {
    title: `${product.name} EMI Plans & Offers | 1Fi Marketplace`,
    description: `Buy ${product.name} on zero-cost & flexible mutual fund backed EMI plans. Up to ₹4,500 cashback with 0% interest tenures.`,
  };
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { slug: true },
    });

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [
      { slug: 'iphone-17-pro' },
      { slug: 'samsung-galaxy-s24-ultra' },
      { slug: 'oneplus-13' },
    ];
  }
}

async function getProduct(slug: string) {
  // First attempt to consume the backend API route GET /api/products/[slug]
  try {
    const port = process.env.PORT || 3000;
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${port}`);
    const res = await fetch(`${baseUrl}/api/products/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback to direct database query
  }

  const slugList =
    slug === 'samsung-s24-ultra' || slug === 'samsung-galaxy-s24-ultra'
      ? ['samsung-galaxy-s24-ultra', 'samsung-s24-ultra']
      : [slug];

  const product = await prisma.product.findFirst({
    where: { slug: { in: slugList } },
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
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    description: product.description,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    variants: product.variants.map((v) => ({
      id: v.id,
      productId: v.productId,
      color: v.color,
      storage: v.storage,
      mrp: v.mrp.toNumber(),
      price: v.price.toNumber(),
      image: v.image,
      emiPlans: v.emiPlans.map((p) => ({
        id: p.id,
        variantId: p.variantId,
        monthlyPayment: p.monthlyPayment.toNumber(),
        tenure: p.tenure,
        interestRate: p.interestRate.toNumber(),
        cashback: p.cashback.toNumber(),
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
    })),
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <ProductDetailView product={product} />
    </div>
  );
}
