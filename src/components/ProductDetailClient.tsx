'use client';

import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import ProductSwitcher from "./ProductSwitcher";

interface EMIPlan {
    monthlyPayment: number;
    tenure: number;
    interestRate: number;
    cashback: number;
}

interface Variant {
    color: string;
    storage: string;
    image?: string;
    images?: string[];
    [key: string]: any; // supports image1, image2, image3... dynamically
    price: number;
    mrp: number;
    emiPlans: EMIPlan[];
}

interface ProductDetailClientProps {
    product: {
        name: string;
        slug: string;
        description: string;
        variants: Variant[];
    };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
    const [selectedEmiIdx, setSelectedEmiIdx] = useState<number | null>(0); // Default to first plan for "neatness"
    const [selectedImageIdx, setSelectedImageIdx] = useState(0);

    const variant = (product.variants && product.variants.length > 0)
        ? product.variants[selectedVariantIdx]
        : null;

    // Build images array — supports images[] array OR image + image1, image2... (non-sequential keys supported)
    const variantImages: string[] = variant
        ? (() => {
            if (variant.images && variant.images.length > 0) return variant.images;
            const imgs: string[] = [];
            if (variant.image) imgs.push(variant.image);
            // Scan all keys matching image{number} and sort numerically
            const numberedKeys = Object.keys(variant)
                .filter(k => /^image\d+$/.test(k))
                .sort((a, b) => parseInt(a.replace('image', '')) - parseInt(b.replace('image', '')));
            for (const key of numberedKeys) {
                if (variant[key]) imgs.push(variant[key]);
            }
            return imgs;
        })()
        : [];

    // Auto-play: cycle images every 3 seconds
    useEffect(() => {
        if (variantImages.length <= 1) return;
        const timer = setInterval(() => {
            setSelectedImageIdx(i => (i + 1) % variantImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [variantImages.length, selectedVariantIdx]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Derived unique colors for the dropdown
    const colors = Array.from(new Set(product.variants.map(v => v.color)));

    // Derived variants for the current color
    const currentColor = variant?.color || colors[0];
    const availableVariants = product.variants.filter(v => v.color === currentColor);

    const handleColorChange = (color: string) => {
        const firstVariantOfColor = product.variants.findIndex(v => v.color === color);
        if (firstVariantOfColor !== -1) {
            setSelectedVariantIdx(firstVariantOfColor);
            setSelectedEmiIdx(0);
            setSelectedImageIdx(0);
        }
    };

    const handleVariantChange = (storage: string) => {
        const matchingIdx = product.variants.findIndex(v => v.color === currentColor && v.storage === storage);
        if (matchingIdx !== -1) {
            setSelectedVariantIdx(matchingIdx);
            setSelectedEmiIdx(0);
            setSelectedImageIdx(0);
        }
    };

    const mainImage = variantImages[selectedImageIdx] || variantImages[0] || '';

    return (
        <div className="min-h-screen bg-[#e0f7fa]/30 py-6 px-4 md:px-10 font-sans">
            <style>{`
                @keyframes carouselFade {
                    from { opacity: 0; transform: scale(0.97); }
                    to   { opacity: 1; transform: scale(1); }
                }
                .carousel-img {
                    animation: carouselFade 0.5s ease forwards;
                }
            `}</style>
            <div className="max-w-6xl mx-auto mb-6 flex justify-center md:justify-start">
                <ProductSwitcher />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10">

                    {/* LEFT SIDE: Image & Selectors */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        {/* Mobile Title (Above Image) */}
                        <div className="md:hidden w-full mb-6">
                            <h1 className="text-[28px] font-black text-[#006064] leading-tight mb-2">
                                {product.name} ({currentColor}, {variant?.storage})
                            </h1>
                            <p className="text-[14px] font-bold text-gray-400">
                                (Storage: {variant?.storage}, Color: {currentColor})
                            </p>
                        </div>

                        {/* Product Image Section */}
                        {/* MOBILE: dot carousel | DESKTOP: left thumbnail strip + main image */}

                        {/* MOBILE CAROUSEL */}
                       
                            {/* Prev / Next buttons */}
                            {variantImages.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImageIdx(i => (i - 1 + variantImages.length) % variantImages.length)}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full shadow flex items-center justify-center text-teal-600"
                                    >&lt;</button>
                                    <button
                                        onClick={() => setSelectedImageIdx(i => (i + 1) % variantImages.length)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full shadow flex items-center justify-center text-teal-600"
                                    >&gt;</button>
                                </>
                            )}
                            {/* Dots */}
                            {variantImages.length > 1 && (
                                <div className="flex justify-center gap-2 mt-3">
                                    {variantImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImageIdx(i)}
                                            className={`rounded-full transition-all ${selectedImageIdx === i
                                                ? 'w-5 h-2 bg-[#4db6ac]'
                                                : 'w-2 h-2 bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* DESKTOP: thumbnail strip + main image */}
                        <div className="hidden md:flex flex-row gap-3 mb-6">
                            {/* Thumbnail Strip (only show if >1 image) */}
                            {variantImages.length > 1 && (
                                <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1">
                                    {variantImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImageIdx(i)}
                                            className={`w-[72px] h-[72px] flex-shrink-0 rounded-xl border-2 overflow-hidden bg-white flex items-center justify-center transition-all ${selectedImageIdx === i
                                                ? 'border-[#4db6ac] shadow-md'
                                                : 'border-gray-200 hover:border-teal-300'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`View ${i + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Main Image */}
                            <div className="flex-1 bg-white rounded-3xl p-8 border border-teal-50 shadow-sm flex items-center justify-center min-h-[360px] md:h-[500px]">
                                {mainImage ? (
                                    <img
                                        key={selectedImageIdx}
                                        src={mainImage}
                                        alt={product.name}
                                        className="carousel-img max-w-full max-h-[300px] md:max-h-[440px] object-contain drop-shadow-xl"
                                    />
                                ) : (
                                    <div className="text-gray-300">No image available</div>
                                )}
                            </div>
                        </div>

                        {/* Selectors Section (Always below image in both mobile and desktop per latest layout) */}
                        <div className="grid grid-cols-2 gap-4 mb-6 md:mb-0">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-teal-600/70 uppercase px-1">Color</label>
                                <div className="relative">
                                    <select
                                        value={currentColor}
                                        onChange={(e) => handleColorChange(e.target.value)}
                                        className="w-full bg-white border border-teal-100 rounded-[8px] md:rounded-[4px] px-4 py-3 appearance-none font-bold text-[#006064] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4db6ac] cursor-pointer"
                                    >
                                        {colors.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-teal-600/70 uppercase px-1">Variant</label>
                                <div className="relative">
                                    <select
                                        value={variant?.storage}
                                        onChange={(e) => handleVariantChange(e.target.value)}
                                        className="w-full bg-white border border-teal-100 rounded-[8px] md:rounded-[4px] px-4 py-3 appearance-none font-bold text-[#006064] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4db6ac] cursor-pointer"
                                    >
                                        {availableVariants.map(v => <option key={v.storage} value={v.storage}>{v.storage}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Price (Below Selectors) */}
                        <div className="md:hidden w-full mb-6">
                            <span className="text-[32px] font-black text-[#006064]">
                                {variant ? formatCurrency(variant.price) : '₹0'}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Product Content */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        {/* Desktop Header */}
                        <div className="hidden md:block mb-8">
                            <h1 className="text-[28px] font-black text-[#006064] leading-tight mb-1">
                                {product.name} ({currentColor}, {variant?.storage})
                            </h1>
                            <p className="text-[14px] font-bold text-gray-400 mb-6">
                                (Storage: {variant?.storage}, Color: {currentColor})
                            </p>
                            <span className="text-[34px] font-black text-[#006064]">
                                {variant ? formatCurrency(variant.price) : '₹0'}
                            </span>
                        </div>

                        {/* EMI Section Card */}
                        <div className="bg-white rounded-[16px] p-6 md:p-4 shadow-sm border border-teal-50">
                            {/* Pay Now Banner */}
                            <div className="flex items-center gap-3 mb-5 md:mb-3 border border-gray-100/50 rounded-xl p-3">
                                <div className="w-10 h-7 bg-[#f1f8e9] rounded-[4px] flex items-center justify-center border border-[#dcedc8]">
                                    <svg className="w-5 h-5 text-[#8bc34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <span className="text-[#1a1a1a] font-bold text-[16px]">
                                    Pay Now : <span className="font-bold">₹19 Downpayment</span>
                                </span>
                            </div>

                            <h2 className="text-[#1a1a1a] text-[16px] md:text-[14px] font-black mb-4 md:mb-3 tracking-tight">Choose EMI Tenure</h2>

                            <div className="space-y-0 mb-5 md:mb-3">
                                {variant && variant.emiPlans && variant.emiPlans.length > 0 ? (
                                    variant.emiPlans.map((plan, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedEmiIdx(i)}
                                            className={`relative py-4 md:py-2.5 cursor-pointer border-b border-gray-100 last:border-0 transition-all duration-200 flex items-center gap-4`}
                                        >
                                            {/* Radio Button */}
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedEmiIdx === i ? "border-[#4db6ac] shadow-[0_0_0_1px_#4db6ac]" : "border-gray-300"
                                                }`}>
                                                {selectedEmiIdx === i && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#4db6ac]" />
                                                )}
                                            </div>

                                            <div className="flex-1 flex justify-between items-center">
                                                <span className="text-[16px] md:text-[14px] font-black text-[#333] tracking-tight">
                                                    {formatCurrency(plan.monthlyPayment)} x {plan.tenure} month
                                                </span>

                                                <span className="text-[11px] font-black px-2 py-1 rounded-[6px] uppercase tracking-widest bg-[#c6e306] text-[#004d40]">
                                                    {plan.interestRate === 0 ? "*0% EMI" : `${plan.interestRate}% INTEREST`}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center text-gray-400">
                                        No EMI plans available.
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-400 text-[13px] font-bold italic mb-4 md:mb-3">EMIs starting 3rd Mar</p>

                            <button
                                disabled={selectedEmiIdx === null}
                                className={`w-full py-4 rounded-[10px] font-bold text-[16px] transition-all flex items-center justify-center shadow-sm ${selectedEmiIdx === null
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                    : "bg-[#003d33] text-white hover:bg-[#002d26] active:scale-[0.99] border-b-4 border-[#002d26]"
                                    }`}
                            >
                                <span>{selectedEmiIdx !== null ? `Buy on ${variant?.emiPlans[selectedEmiIdx].tenure} months EMI` : "Select EMI Tenure"}</span>
                            </button>
                        </div>

                        {/* FOOTER LABELS (Bottom Right on Desktop) */}

                    </div>
                </div>
            </div>
        </div>
    );
}


