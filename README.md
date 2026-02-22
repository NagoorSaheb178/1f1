# 1Fi: Premium EMI Experience Platform

A high-fidelity, full-stack web application demonstrating a modern e-commerce checkout experience with **Mutual Fund backed EMI plans**. Built with Next.js, this project emphasizes performance, visual excellence, and strict architectural standards.

![Project Preview](https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2070&auto=format&fit=crop)

## 🌟 Key Features

- **Dynamic Product Engine**: Fully data-driven product pages with unique slugs and dynamic routing.
- **Variant Management**: Seamless switching between color and storage variants with synchronized pricing and EMI plan updates.
- **Interactive EMI Stack**: A custom-built, selectable EMI plan selector with real-time interest and cashback calculations.
- **Premium Aesthetics**: Mobile-first, responsive design using Inter typography, subtle micro-animations, and a curated color palette.
- **Strict Configuration**: Secure environment-only configuration for database and API connectivity (Zero-fallback policy).

## � Technical Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Hooks (useState/useEffect) with URL-synchronized hydration
- **Backend**: Next.js Serverless API Routes
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) modeling
- **Icons**: [Lucide React](https://lucide.dev/)

## � Project Structure

```bash
├── src/
│   ├── app/
│   │   ├── api/            # Serverless API endpoints (Seed, Products)
│   │   ├── products/       # Dynamic product routing [slug]
│   │   └── globals.css     # Global design system & theme tokens
│   ├── components/         # High-fidelity UI components
│   ├── lib/                # Database connection utilities
│   └── models/             # Mongoose schemas (Product, Variant, EMI)
├── public/                 # Optimized product assets
└── .env.local              # Environment configuration
```

## 🚥 API Reference

### Get All Products
`GET /api/products`
Returns an array of all active products in the catalog.

### Get Product by Slug
`GET /api/products/:slug`
Returns detailed metadata for a specific product, including all variants and EMI structures.

### Get Product by Slug
`GET /api/products/:slug`
Returns detailed metadata for a specific product, including all variants and EMI structures from the database.

## ⚙️ Installation & Setup

1. **Clone the Project**
   ```bash
   git clone <your-repo-url>
   cd 1f1
   ```

2. **Environment Configuration**
   Create a `.env.local` in the root directory:
   ```env
   # Required for Database Persistence
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Launch Application**
   ```bash
   npm run dev
   ```


*Developed as part of the 1Fi Full Stack Developer Assignment.*
