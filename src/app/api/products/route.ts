import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await dbConnect();
        const db = mongoose.connection.db;
        const products = await db!.collection('products').find({}).toArray();
        return NextResponse.json(products);
    } catch (error: any) {
        console.error('Error fetching products:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
