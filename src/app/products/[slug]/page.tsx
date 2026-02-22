export const dynamic = 'force-dynamic';

import ProductDetailClient from '@/components/ProductDetailClient';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

async function getProduct(slug: string) {
    try {
        await dbConnect();
        const db = mongoose.connection.db;
        const product = await db!.collection('products').findOne({ slug });
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const productData = await getProduct(slug);

    if (!productData) {
        notFound();
    }

    // Convert MongoDB document to plain JSON object
    const product = JSON.parse(JSON.stringify(productData));

    return <ProductDetailClient product={product} />;
}
