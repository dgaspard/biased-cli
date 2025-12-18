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
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-neutral-400">Enter your credentials to access the Governance Portal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-800 border-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-neutral-600"
                                placeholder="admin@biased.ai"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-800 border-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-neutral-600"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 focus:ring-4 focus:ring-neutral-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-neutral-500">
                        Protected by BIASED Framework Authentication Layer. v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}
