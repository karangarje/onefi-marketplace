# 1Fi Marketplace — SDE Intern Assignment

A full-stack e-commerce marketplace for smartphones with multiple EMI plans.
Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Prisma**, and **PostgreSQL**.

---

## Project Overview

1Fi Marketplace demonstrates a complete full-stack web application where:

- Products (smartphones) are stored in a PostgreSQL database
- Each product has multiple **variants** (color + storage combinations)
- Each variant has multiple **EMI plans** (different tenures and interest rates)
- All data is fetched from backend API routes — **no hardcoded business data in the frontend**
- Users can browse products, select variants, choose an EMI plan, and confirm the selection

---

## Assignment Architecture & Shop Structure

The application follows the official 1Fi assignment structure:

```
                         SHOP (/shop)
                          │
             ┌────────────┼────────────┐
             │            │            │
             ↓            ↓            ↓
        Top Brands   Nearby Stores   1Fi Marketplace
     (/shop/top-brands) (/shop/nearby-stores) (/shop/marketplace)
        (Blank)      (Blank)              │
                                          ↓
                                  Marketplace Home
                                          │
                                          ↓
                                      Products (/products)
                                          │
                                          ↓
                                   Product Detail (/products/[slug])
                                          │
                            ┌─────────────┼─────────────┐
                            ↓             ↓             ↓
                         Variant        Price          EMI
                                                        │
                                                        ↓
                                                  Select EMI
                                                        │
                                                        ↓
                                                   Proceed
```

### Shop Structure

- **Shop Entry**: `/shop`
- **Option 1: Top Brands**: `/shop/top-brands` (intentionally blank / Coming Soon placeholder)
- **Option 2: Nearby Stores**: `/shop/nearby-stores` (intentionally blank / Coming Soon placeholder)
- **Option 3: 1Fi Marketplace**: `/shop/marketplace` (fully implemented assignment feature)

### Marketplace Routes

- `/shop/marketplace` — 1Fi Marketplace Home (hero, featured products, links)
- `/products` & `/shop/marketplace/products` — Product catalog
- `/products/[slug]` & `/shop/marketplace/products/[slug]` — Product detail with variant selector and EMI plans

### API Endpoints

- `GET /api/products` — Returns all products with variants and EMI plans
- `GET /api/products/:slug` — Returns a single product by slug with all variants and EMI plans

### Database Relationship

```
Product (id, name, slug, brand, description)
   │
   └── 1:N ──> Variant (id, productId, color, storage, mrp, price, image)
                   │
                   └── 1:N ──> EMIPlan (id, variantId, monthlyPayment, tenure, interestRate, cashback)
```

---

## Features

- **Home page** — marketplace hero, featured products, how-it-works section
- **Products listing page** — dynamic grid with brand filter, search, and sort
- **Product detail page** — variant selector (color + storage), live price/MRP update, EMI plan cards
- **Variant selection** — changing color or storage updates image, price, MRP, savings, and EMI plans
- **EMI plan cards** — selectable cards with tenure, monthly payment, interest rate, and cashback
- **Proceed modal** — confirmation dialog showing full EMI breakdown (no real payment)
- **Loading skeletons** — for all pages during data fetch
- **Error/not-found pages** — clean 404 for invalid product slugs
- **Responsive design** — works from 320px mobile to 1440px desktop

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Framework  | Next.js 16 (App Router)     |
| Frontend   | React 19                    |
| Styling    | Tailwind CSS v4             |
| Language   | TypeScript                  |
| ORM        | Prisma 6                    |
| Database   | PostgreSQL                  |
| Validation | Zod                         |
| Icons      | Lucide React                |
| Runtime    | Node.js                     |

---

## Architecture

```
Browser (React / Next.js Client Components)
        |
        v
Next.js App Router (Server Components + API Routes)
        |
        +-- GET /api/products         -> list all products
        +-- GET /api/products/[slug]  -> single product with variants + EMI plans
                |
                v
        Prisma ORM
                |
                v
        PostgreSQL Database
```

---

## Folder Structure

```
onefi-marketplace/
├── prisma/
│   ├── schema.prisma          # Database schema (Product, Variant, EMIPlan)
│   └── seed.ts                # Seed data: 3 products, 11 variants, 33 EMI plans
├── public/
│   └── images/products/       # Product SVG images (served statically)
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Home page (Server Component)
│   │   ├── layout.tsx                   # Root layout with Navbar + Footer
│   │   ├── loading.tsx                  # Global loading skeleton
│   │   ├── not-found.tsx                # Global 404 page
│   │   ├── api/products/
│   │   │   ├── route.ts                 # GET /api/products
│   │   │   └── [slug]/route.ts          # GET /api/products/:slug
│   │   └── products/
│   │       ├── page.tsx                 # Products listing
│   │       ├── loading.tsx              # Products loading skeleton
│   │       └── [slug]/
│   │           ├── page.tsx             # Product detail
│   │           ├── loading.tsx          # Detail loading skeleton
│   │           └── not-found.tsx        # Product not found
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Sticky navigation
│   │   │   └── Footer.tsx               # Site footer
│   │   ├── products/
│   │   │   ├── ProductCard.tsx          # Product card
│   │   │   ├── ProductGrid.tsx          # Filterable product grid
│   │   │   ├── ProductDetailView.tsx    # Product detail with state
│   │   │   └── VariantSelector.tsx      # Color + storage selector
│   │   ├── emi/
│   │   │   ├── EMIPlanCard.tsx          # Selectable EMI card
│   │   │   ├── EMIPlanList.tsx          # EMI cards + Proceed button
│   │   │   └── ProceedModal.tsx         # EMI confirmation modal
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       └── Skeleton.tsx
│   ├── lib/
│   │   ├── prisma.ts                    # Prisma client singleton
│   │   ├── utils.ts                     # formatINR, calculateSavings
│   │   └── validations.ts               # Zod slug schema
│   └── types/
│       ├── product.ts                   # TypeScript interfaces
│       └── emi.ts                       # EMI TypeScript interfaces
├── .env.example               # Environment variable template
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

---

## Database Schema

### Product

| Column      | Type     | Notes                      |
|-------------|----------|----------------------------|
| id          | Int (PK) | Auto-increment             |
| name        | String   | e.g. "Apple iPhone 17 Pro" |
| slug        | String   | Unique URL identifier      |
| brand       | String   | e.g. "Apple"               |
| description | Text     |                            |
| createdAt   | DateTime |                            |
| updatedAt   | DateTime |                            |

### Variant

| Column    | Type          | Notes                      |
|-----------|---------------|----------------------------|
| id        | Int (PK)      | Auto-increment             |
| productId | Int (FK)      | References Product.id      |
| color     | String        | e.g. "Titanium Black"      |
| storage   | String        | e.g. "256GB"               |
| mrp       | Decimal(10,2) | Maximum retail price (INR) |
| price     | Decimal(10,2) | Selling price (INR)        |
| image     | String        | Path to product image      |
| createdAt | DateTime      |                            |
| updatedAt | DateTime      |                            |

> Unique constraint on `(productId, color, storage)` — prevents duplicate combinations.

### EMIPlan

| Column         | Type          | Notes                           |
|----------------|---------------|---------------------------------|
| id             | Int (PK)      | Auto-increment                  |
| variantId      | Int (FK)      | References Variant.id           |
| monthlyPayment | Decimal(10,2) | Computed EMI amount in INR      |
| tenure         | Int           | Duration in months (3, 6, 12)  |
| interestRate   | Decimal(5,2)  | Annual rate e.g. 0.00 or 10.50 |
| cashback       | Decimal(10,2) | Cashback in INR                 |
| createdAt      | DateTime      |                                 |
| updatedAt      | DateTime      |                                 |

### Relationships

```
Product (1) --< Variant (many)
Variant (1) --< EMIPlan (many)
```

Cascade deletes: deleting a Product removes all its Variants and their EMIPlans.

---

## Seed Data

| Entity    | Count |
|-----------|-------|
| Products  | 3     |
| Variants  | 11    |
| EMI Plans | 33    |

**Products seeded:**

1. **Apple iPhone 17 Pro** — 4 variants (Silver/Black x 256GB/512GB)
2. **Samsung Galaxy S24 Ultra** — 4 variants (Titanium Black/Gray/Violet x 256GB/512GB)
3. **OnePlus 13** — 3 variants (Black 256GB, Blue 512GB, Black 512GB)

**EMI Plans per variant (3 each):**

| Plan | Tenure | Interest | Cashback (Flagship) | Cashback (Premium) |
|------|--------|----------|---------------------|--------------------|
| A    | 3 mo   | 0%       | Rs. 2,000           | Rs. 1,500          |
| B    | 6 mo   | 10.5%    | Rs. 3,000           | Rs. 2,500          |
| C    | 12 mo  | 10.5%    | Rs. 4,500           | Rs. 3,500          |

**EMI Calculation Methodology:**

- **0% Interest:** `EMI = price / tenure`
- **Interest-bearing:** Standard reducing-balance formula:
  `EMI = P * r * (1+r)^n / ((1+r)^n - 1)` where `r = annualRate / 1200`

---

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_marketplace?schema=public"
```

For cloud PostgreSQL (Neon etc.):

```env
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/onefi_marketplace?sslmode=require"
```

---

## Installation and Local Setup

**Prerequisites:** Node.js >= 18, PostgreSQL >= 14

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/onefi-marketplace.git
cd onefi-marketplace

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Seed the database
npx prisma db seed

# 6. Start the development server
npm run dev
```

Open http://localhost:3000

---

## Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name <name>

# Apply migrations in production
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Open Prisma Studio (GUI)
npx prisma studio

# Reset database (drop + migrate + seed)
npx prisma migrate reset
```

---

## API Endpoints

### GET /api/products

Returns all products with starting price, thumbnail, variant count, and lowest EMI.

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "startingPrice": 129900,
      "startingMrp": 139900,
      "lowestMonthlyPayment": 43300,
      "thumbnail": "/images/products/iphone-17-pro-silver.svg",
      "availableColors": ["Silver", "Black"],
      "availableStorages": ["256GB", "512GB"],
      "variantCount": 4
    }
  ]
}
```

### GET /api/products/:slug

Returns a single product with all variants and EMI plans. Supports both slug and numeric ID.

**Example: GET /api/products/samsung-galaxy-s24-ultra**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Samsung Galaxy S24 Ultra",
    "slug": "samsung-galaxy-s24-ultra",
    "brand": "Samsung",
    "description": "The ultimate Galaxy Ultra with Galaxy AI, titanium shield...",
    "variants": [
      {
        "id": 5,
        "color": "Titanium Black",
        "storage": "256GB",
        "mrp": 134999,
        "price": 124999,
        "image": "/images/products/samsung-s24-ultra-black.svg",
        "emiPlans": [
          { "id": 13, "tenure": 3, "interestRate": 0, "monthlyPayment": 41666.33, "cashback": 2000 },
          { "id": 14, "tenure": 6, "interestRate": 10.5, "monthlyPayment": 21476.12, "cashback": 3000 },
          { "id": 15, "tenure": 12, "interestRate": 10.5, "monthlyPayment": 11018.34, "cashback": 4500 }
        ]
      }
    ]
  }
}
```

**404 Response (GET /api/products/does-not-exist):**

```json
{
  "success": false,
  "error": "Product with slug 'does-not-exist' was not found"
}
```

### GET /api/products/:slug/emi-plans

Returns all database-backed EMI plans for a product, with optional variant filtering via `?variantId=:id`.

**Example: GET /api/products/samsung-galaxy-s24-ultra/emi-plans**

```json
{
  "success": true,
  "product": {
    "id": 2,
    "name": "Samsung Galaxy S24 Ultra",
    "slug": "samsung-galaxy-s24-ultra",
    "brand": "Samsung"
  },
  "count": 12,
  "data": [
    {
      "id": 13,
      "variantId": 5,
      "productId": 2,
      "productName": "Samsung Galaxy S24 Ultra",
      "variantName": "Titanium Black • 256GB",
      "color": "Titanium Black",
      "storage": "256GB",
      "variantPrice": 124999,
      "variantMrp": 134999,
      "tenure": 3,
      "monthlyPayment": 41666.33,
      "interestRate": 0,
      "cashback": 2000,
      "effectivePrice": 122999
    }
  ]
}
```

---

## Product URLs

| Product                   | Primary URL                                  | Alias URL                    |
|---------------------------|----------------------------------------------|------------------------------|
| Apple iPhone 17 Pro       | `/products/iphone-17-pro`                    | —                            |
| Samsung Galaxy S24 Ultra  | `/products/samsung-galaxy-s24-ultra`         | `/products/samsung-s24-ultra`|
| OnePlus 13                | `/products/oneplus-13`                       | —                            |

All URLs dynamically load product information from PostgreSQL through Prisma and the backend APIs. No hardcoded product routes exist.

---

## Manual Test Flow

1. Open http://localhost:3000 — Home page directing to Shop
2. Click **Shop** -> **1Fi Marketplace** -> **Explore Products**
3. Select **Samsung Galaxy S24 Ultra** — URL: `/products/samsung-galaxy-s24-ultra`
4. Select **Titanium Black** and **256GB** — image and pricing dynamically update from DB variant
5. Select a **3-Month EMI plan** (0% interest, ₹2,000 cashback)
6. Click **Proceed with EMI** — confirmation modal opens
7. Modal shows dynamic product, variant, selling price, MRP, tenure, monthly payment, cashback, and effective price (₹1,22,999)
8. Click **Proceed with Plan** — confirmation view with full summary details
9. Test `/products/iphone-17-pro` and `/products/oneplus-13`
10. Open `/products/does-not-exist` — verify clean 404

### API Testing

```bash
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products/iphone-17-pro
curl http://localhost:3000/api/products/samsung-galaxy-s24-ultra
curl http://localhost:3000/api/products/samsung-galaxy-s24-ultra/emi-plans
curl http://localhost:3000/api/products/oneplus-13
curl http://localhost:3000/api/products/oneplus-13/emi-plans
curl http://localhost:3000/api/products/does-not-exist
```

---

## Build and Deployment

```bash
# Build
npm run build

# Start production server
npm run start
```

### Vercel Deployment

1. Push repo to GitHub
2. Import at vercel.com
3. Set `DATABASE_URL` in Vercel Environment Variables (e.g. hosted PostgreSQL from Neon, Supabase, AWS RDS, etc.)
4. Set Build Command: `npx prisma generate && next build`
5. Deploy

---

## GitHub Setup

```bash
git init
git add .
git commit -m "feat: 1Fi Marketplace SDE intern assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/onefi-marketplace.git
git push -u origin main
```

---

## Demo Video Checklist (2-5 minutes)

- [ ] Home page — products loaded from API
- [ ] Navigate to /shop and explore 1Fi Marketplace
- [ ] Navigate to /products listing page
- [ ] Show /api/products JSON in browser
- [ ] Open iPhone detail — show unique URL /products/iphone-17-pro
- [ ] Switch color — image and price update
- [ ] Switch storage — price update
- [ ] Select EMI plan — selected card state visible
- [ ] Click Proceed — modal with full breakdown
- [ ] Confirm — EMI Plan Confirmed success screen with dynamic details
- [ ] Open Samsung page — verify Samsung data
- [ ] Open OnePlus page — verify OnePlus data
- [ ] Open invalid slug — clean 404 page

---

## Assignment Compliance

- ✅ Full-stack application
- ✅ React + Next.js
- ✅ Tailwind CSS
- ✅ Node.js (Next.js API routes)
- ✅ PostgreSQL + Prisma
- ✅ 3 products minimum
- ✅ 2+ variants per product
- ✅ EMI plans per variant
- ✅ Product name, brand, image, MRP, price from database
- ✅ Monthly payment, tenure, interest rate, cashback from database
- ✅ Selectable EMI cards
- ✅ Proceed button with validation
- ✅ Unique product URLs via slug
- ✅ No hardcoded business data in frontend
- ✅ Loading skeletons
- ✅ 404 error pages
- ✅ Responsive design
- ✅ Database schema documented
- ✅ Seed data provided
- ✅ API endpoints documented with example responses
- ✅ .env.example committed
- ✅ README with full setup instructions
