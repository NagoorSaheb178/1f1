'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function ProductSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const params = useParams();
    const slug = params?.slug;
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products for switcher:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentProduct = products.find((p) => p.slug === slug);

    return (
        <div className="relative inline-block text-left w-full max-w-[280px]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 bg-white px-6 py-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-[#1a1a1a] font-bold text-sm tracking-wide transition-all hover:bg-gray-50 active:scale-[0.98] border border-gray-100/50"
            >
                <span className="truncate">{currentProduct ? currentProduct.name : "Select Product"}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-full min-w-[280px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-3 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top">
                    <div className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#999] opacity-70">Catalog</div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {products.map((p) => (
                            <button
                                key={p._id}
                                onClick={() => {
                                    router.push(`/products/${p.slug}`);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-5 py-3.5 flex items-center justify-between transition-all group ${p.slug === slug
                                    ? "bg-[#F37021]/5 text-[#F37021] font-bold"
                                    : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                                    }`}
                            >
                                <span className="text-[14px]">{p.name}</span>
                                {p.slug === slug && (
                                    <CheckCircle2 className="w-4 h-4 text-[#f37021]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
