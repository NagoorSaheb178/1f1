import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';

const products = [
    {
        name: "iPhone 17 Pro",
        slug: "iphone-17-pro",
        description: "Experience the pinnacle of innovation with the iPhone 17 Pro. Featuring the breakthrough A19 Pro chip, an advanced titanium design, and a revolutionary camera system that redefines mobile photography. The stunning Super Retina XDR display with ProMotion technology offers an ultra-responsive feel for everything you do.",
        variants: [
            {
                color: "Steel Black",
                storage: "256GB",
                image: "/products/iphone-black.png",
                price: 129900,
                mrp: 134900,
                emiPlans: [
                    { monthlyPayment: 7216, tenure: 18, interestRate: 0, cashback: 5000 },
                    { monthlyPayment: 10825, tenure: 12, interestRate: 0, cashback: 3000 },
                    { monthlyPayment: 21650, tenure: 6, interestRate: 0, cashback: 1500 }
                ]
            },
            {
                color: "Titanium Orange",
                storage: "512GB",
                image: "/products/iphone-orange.png",
                price: 149900,
                mrp: 154900,
                emiPlans: [
                    { monthlyPayment: 8327, tenure: 18, interestRate: 0, cashback: 6000 },
                    { monthlyPayment: 12491, tenure: 12, interestRate: 0, cashback: 4000 }
                ]
            }
        ]
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        slug: "samsung-galaxy-s24-ultra",
        description: "The ultimate Galaxy Ultra experience, now with Galaxy AI. Unleash new levels of creativity, productivity, and possibility. Featuring a 200MP camera, built-in S Pen, and a titanium frame for unparalleled durability and premium feel.",
        variants: [
            {
                color: "Titanium Black",
                storage: "256GB",
                image: "/products/s24-black.png",
                image1: "/products/s24-black-banner.png",
                price: 119999,
                mrp: 129999,
                emiPlans: [
                    { monthlyPayment: 6666, tenure: 18, interestRate: 0, cashback: 4000 },
                    { monthlyPayment: 9999, tenure: 12, interestRate: 0, cashback: 2500 }
                ]
            },
            {
                color: "Titanium Gray",
                storage: "512GB",
                image: "/products/s24-gray.png",
                image1: "/products/s24-gray-banner.png",
                price: 129999,
                mrp: 139999,
                emiPlans: [
                    { monthlyPayment: 7222, tenure: 18, interestRate: 0, cashback: 5000 },
                    { monthlyPayment: 10833, tenure: 12, interestRate: 0, cashback: 3000 }
                ]
            }
        ]
    },
    {
        name: "MacBook Pro M3",
        slug: "macbook-pro-m3",
        description: "The most advanced chips ever built for a personal computer. M3, M3 Pro, and M3 Max push the GPU architecture further than ever. And with a stunning Liquid Retina XDR display and up to 22 hours of battery life, it's pro in every way.",
        variants: [
            {
                color: "Space Gray",
                storage: "512GB",
                image: "/products/macbook-spacegray.png",
                image1: "/products/macbook-banner.png",
                price: 169900,
                mrp: 174900,
                emiPlans: [
                    { monthlyPayment: 9438, tenure: 18, interestRate: 0, cashback: 7000 },
                    { monthlyPayment: 14158, tenure: 12, interestRate: 0, cashback: 5000 }
                ]
            },
            {
                color: "Silver",
                storage: "1TB",
                image: "/products/macbook-silver.png",
                price: 189900,
                mrp: 194900,
                emiPlans: [
                    { monthlyPayment: 10550, tenure: 18, interestRate: 0, cashback: 8000 }
                ]
            }
        ]
    },
    {
        name: "OnePlus 12",
        slug: "oneplus-12",
        description: "Smooth Beyond Belief. The OnePlus 12 redefines the meaning of smooth with the Snapdragon 8 Gen 3, a 2K 120Hz ProXDR display, and the 4th Gen Hasselblad Camera System for Mobile.",
        variants: [
            {
                color: "Silky Black",
                storage: "256GB",
                image: "/products/oneplus-black.png",
                image1: "/products/oneplus-banner.png",
                price: 64999,
                mrp: 69999,
                emiPlans: [
                    { monthlyPayment: 3611, tenure: 18, interestRate: 0, cashback: 2000 },
                    { monthlyPayment: 5416, tenure: 12, interestRate: 0, cashback: 1000 }
                ]
            },
            {
                color: "Emerald Green",
                storage: "512GB",
                image: "/products/oneplus-emerald.png",
                price: 69999,
                mrp: 74999,
                emiPlans: [
                    { monthlyPayment: 3888, tenure: 18, interestRate: 0, cashback: 2500 }
                ]
            }
        ]
    },
    {
        name: "Samsung 1.5 Ton Inverter AC",
        slug: "samsung-inverter-ac",
        description: "Experience ultimate cooling comfort with the Samsung Wind-Free™ Inverter AC. Designed to cool you without the unpleasant feeling of cold wind, while saving up to 73% energy.",
        variants: [
            {
                color: "White",
                storage: "1.5 Ton / 5 Star",
                image: "/products/samsung-ac.png",
                image1: "/products/samsung-ac-banner.png",
                price: 45990,
                mrp: 52990,
                emiPlans: [
                    { monthlyPayment: 2555, tenure: 18, interestRate: 0, cashback: 1500 },
                    { monthlyPayment: 3832, tenure: 12, interestRate: 0, cashback: 800 }
                ]
            }
        ]
    },
    {
        name: "Samsung Crystal 4K UHD TV",
        slug: "samsung-crystal-4k-tv",
        description: "Unlock a world of color with life-like resolution. Enjoy breathtaking 4K clarity and vibrant scenes that look as real as the world around you with Crystal Processor 4K.",
        variants: [
            {
                color: "Titan Black",
                storage: "55 Inch",
                image: "/products/samsung-tv-black.png",
                price: 42990,
                mrp: 54990,
                emiPlans: [
                    { monthlyPayment: 2388, tenure: 18, interestRate: 0, cashback: 1200 },
                    { monthlyPayment: 3582, tenure: 12, interestRate: 0, cashback: 600 }
                ]
            },
            {
                color: "Sleek Silver",
                storage: "65 Inch",
                image: "/products/samsung-tv-silver.png",
                price: 62990,
                mrp: 79990,
                emiPlans: [
                    { monthlyPayment: 3499, tenure: 18, interestRate: 0, cashback: 2000 }
                ]
            }
        ]
    }
];

export async function GET() {
    try {
        await dbConnect();

        // Clear existing products
        await Product.deleteMany({});

        // Insert new products
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `${result.length} products seeded successfully!`,
            products: result
        });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
