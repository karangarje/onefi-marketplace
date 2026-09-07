import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (annualRate === 0) {
    return Math.round((principal / tenureMonths) * 100) / 100;
  }
  const monthlyRate = annualRate / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi * 100) / 100;
}

interface VariantSeed {
  color: string;
  storage: string;
  mrp: number;
  price: number;
  image: string;
  cashbackTier: 'flagship' | 'premium';
}

interface ProductSeed {
  name: string;
  slug: string;
  brand: string;
  description: string;
  variants: VariantSeed[];
}

const products: ProductSeed[] = [
  {
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    description:
      'Forged in aerospace-grade titanium with the breakthrough A19 Pro chip, 48MP Pro camera system with 5x optical zoom, and unmatched battery longevity. Supported with zero-cost mutual fund backed EMI options.',
    variants: [
      {
        color: 'Silver',
        storage: '256GB',
        mrp: 139900,
        price: 129900,
        image: '/images/products/iphone-17-pro-silver.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Black',
        storage: '256GB',
        mrp: 139900,
        price: 129900,
        image: '/images/products/iphone-17-pro-black.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Silver',
        storage: '512GB',
        mrp: 159900,
        price: 149900,
        image: '/images/products/iphone-17-pro-silver.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Black',
        storage: '512GB',
        mrp: 159900,
        price: 149900,
        image: '/images/products/iphone-17-pro-black.svg',
        cashbackTier: 'flagship',
      },
    ],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    description:
      'The ultimate Galaxy Ultra with Galaxy AI, titanium shield, 200MP camera with Quad Tele system, and embedded S-Pen. Optimized with instant mutual fund portfolio pledge and high-cashback EMI tenures.',
    variants: [
      {
        color: 'Titanium Black',
        storage: '256GB',
        mrp: 134999,
        price: 124999,
        image: '/images/products/samsung-s24-ultra-black.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Titanium Gray',
        storage: '256GB',
        mrp: 134999,
        price: 124999,
        image: '/images/products/samsung-s24-ultra-gray.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Titanium Gray',
        storage: '512GB',
        mrp: 144999,
        price: 134999,
        image: '/images/products/samsung-s24-ultra-gray.svg',
        cashbackTier: 'flagship',
      },
      {
        color: 'Titanium Violet',
        storage: '256GB',
        mrp: 134999,
        price: 124999,
        image: '/images/products/samsung-s24-ultra-violet.svg',
        cashbackTier: 'flagship',
      },
    ],
  },
  {
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    brand: 'OnePlus',
    description:
      'Unmatched performance driven by Snapdragon 8 Elite, 2K 120Hz ProXDR display, 6000mAh battery with 100W SUPERVOOC charging, and 4th Gen Hasselblad camera module.',
    variants: [
      {
        color: 'Black',
        storage: '256GB',
        mrp: 74999,
        price: 69999,
        image: '/images/products/oneplus-13-black.svg',
        cashbackTier: 'premium',
      },
      {
        color: 'Blue',
        storage: '512GB',
        mrp: 84999,
        price: 77999,
        image: '/images/products/oneplus-13-blue.svg',
        cashbackTier: 'premium',
      },
      {
        color: 'Black',
        storage: '512GB',
        mrp: 84999,
        price: 77999,
        image: '/images/products/oneplus-13-black.svg',
        cashbackTier: 'premium',
      },
    ],
  },
];

async function main() {
  console.log('🚀 Starting 1Fi Marketplace database seeding...');

  // Clean existing records to guarantee clean state
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const p of products) {
    console.log(`\n📱 Creating product: ${p.name} (${p.brand})`);

    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        description: p.description,
      },
    });

    for (const v of p.variants) {
      const createdVariant = await prisma.variant.create({
        data: {
          productId: createdProduct.id,
          color: v.color,
          storage: v.storage,
          mrp: v.mrp,
          price: v.price,
          image: v.image,
        },
      });

      // Cashback values based on tier
      const cb3 = v.cashbackTier === 'flagship' ? 2000 : 1500;
      const cb6 = v.cashbackTier === 'flagship' ? 3000 : 2500;
      const cb12 = v.cashbackTier === 'flagship' ? 4500 : 3500;

      // Plan A: 3 Months, 0% Interest (No-Cost EMI)
      const emi3 = calculateEMI(v.price, 0, 3);
      // Plan B: 6 Months, 10.5% Interest
      const emi6 = calculateEMI(v.price, 10.5, 6);
      // Plan C: 12 Months, 10.5% Interest
      const emi12 = calculateEMI(v.price, 10.5, 12);

      await prisma.eMIPlan.createMany({
        data: [
          {
            variantId: createdVariant.id,
            tenure: 3,
            interestRate: 0.0,
            monthlyPayment: emi3,
            cashback: cb3,
          },
          {
            variantId: createdVariant.id,
            tenure: 6,
            interestRate: 10.5,
            monthlyPayment: emi6,
            cashback: cb6,
          },
          {
            variantId: createdVariant.id,
            tenure: 12,
            interestRate: 10.5,
            monthlyPayment: emi12,
            cashback: cb12,
          },
        ],
      });

      console.log(
        `  ✔ Variant: ${v.color} / ${v.storage} - ₹${v.price.toLocaleString('en-IN')} (3 EMI plans created)`
      );
    }
  }

  const totalProducts = await prisma.product.count();
  const totalVariants = await prisma.variant.count();
  const totalPlans = await prisma.eMIPlan.count();

  console.log('\n=======================================');
  console.log(`🎉 Database seeded successfully!`);
  console.log(`   Products : ${totalProducts}`);
  console.log(`   Variants : ${totalVariants}`);
  console.log(`   EMI Plans: ${totalPlans}`);
  console.log('=======================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
