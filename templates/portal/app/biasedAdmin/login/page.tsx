"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mimic API delay
        setTimeout(() => {
            sessionStorage.setItem('biased_auth', 'true');
            router.push('/biasedAdmin');
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white border border-[#E0E0E0] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                    {/* Decor - Brand color gradient bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B7B4B] via-[#3F6E7B] to-[#6BA357]" />

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#2D2D2D]">Welcome Back</h1>
                        <p className="text-[#5A5A5A]">Enter your credentials to access the Governance Portal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-[#2D2D2D]">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F8] border border-[#E0E0E0] text-[#2D2D2D] focus:ring-2 focus:ring-[#3B7B4B] focus:border-transparent outline-none transition-all placeholder:text-[#5A5A5A]"
                                placeholder="admin@biased.ai"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-[#2D2D2D]">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 rounded-lg bg-[#F8F8F8] border border-[#E0E0E0] text-[#2D2D2D] focus:ring-2 focus:ring-[#3B7B4B] focus:border-transparent outline-none transition-all placeholder:text-[#5A5A5A]"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-lg bg-[#3B7B4B] text-white font-bold hover:bg-[#2F6139] focus:ring-4 focus:ring-[#6BA357]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-[#5A5A5A]">
                        Protected by BIASED Framework Authentication Layer. v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}
