"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dashboard URL will be injected during installation
const DASHBOARD_URL = "{{DASHBOARD_URL}}";

export default function AdminWelcome() {
    const router = useRouter();

    useEffect(() => {
        // Simple mock auth check
        const isAuthenticated = sessionStorage.getItem('biased_auth');
        if (!isAuthenticated) {
            router.push('/biasedAdmin/login');
        }
    }, [router]);

    return (
        <div className="flex flex-col min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#6BA357] bg-[#E7F0E8] text-[#3B7B4B] text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#6BA357]" />
                    Admin Portal Active
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    <span className="text-[#2D2D2D]">BIASED</span>{" "}
                    <span className="text-[#3F6E7B] font-normal">Control</span>
                </h1>

                <p className="text-lg md:text-xl text-[#5A5A5A] max-w-3xl leading-relaxed">
                    Manage governance, monitor behavior, and ensure compliance across your AI systems.
                </p>
            </header>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Project Dashboard Card */}
                <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1.5 bg-[#3B7B4B]" />
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-[#CCCCCC] mb-3">
                            Project Dashboard
                        </h2>
                        <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                            View real-time metrics, evaluation scores, and governance reports.
                        </p>
                        <a
                            href={DASHBOARD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#3B7B4B] font-semibold hover:gap-4 transition-all"
                        >
                            Launch Dashboard <span className="text-[#E5A83D]">→</span>
                        </a>
                    </div>
                </div>

                {/* Documentation Card */}
                <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1.5 bg-[#3F6E7B]" />
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-[#CCCCCC] mb-3">
                            Documentation
                        </h2>
                        <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                            Access integration guides, intent definitions, and API references.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#5A5A5A]">
                                <svg className="w-5 h-5 text-[#6BA357]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>View SOPs</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#5A5A5A]">
                                <svg className="w-5 h-5 text-[#6BA357]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Glossary</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create New Intent Card */}
                <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1.5 bg-[#E5A83D]" />
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-[#CCCCCC] mb-3">
                            Create New Intent
                        </h2>
                        <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                            Define new business value and intent statements for your AI systems.
                        </p>
                        <button
                            className="inline-flex items-center gap-2 text-[#3B7B4B] font-semibold hover:gap-4 transition-all"
                        >
                            Create Intent <span className="text-[#E5A83D]">→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="pt-8 border-t-2 border-[#E0E0E0] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#5A5A5A]">
                <p className="text-sm">
                    © {new Date().getFullYear()} BIASED Framework. Professional governance and compliance.
                </p>
                <button
                    onClick={() => {
                        sessionStorage.removeItem('biased_auth');
                        router.push('/biasedAdmin/login');
                    }}
                    className="text-sm font-semibold hover:text-[#3B7B4B] transition-colors"
                >
                    Sign Out
                </button>
            </footer>
        </div>
    );
}
