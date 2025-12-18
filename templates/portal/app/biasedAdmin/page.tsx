"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Config Loader (in a real app this would be more robust)
// In a real implementation this might fetch from an API route that reads the JSON
// For this template, we'll placeholder it or allow it to be injected via DefinePlugin if we were fancy
// but for simplicity we will just read a local config file if we can, or just hardcode the logic for now.
// Because this is a client component, we can't read files directly.
// We will assume the user manually configures the env or we write it to a localized config file.
// For MVP, we will assume the dashboard URL is passed or hardcoded by the installer replacer.
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
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="w-full max-w-4xl space-y-12">
                {/* Header */}
                <header className="flex flex-col items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Admin Portal Active
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        BIASED <span className="font-light">Control</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Manage governance, monitor behavior, and ensure compliance across your AI systems.
                    </p>
                </header>

                {/* Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="group relative p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
                        <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-blue-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-white">Project Dashboard</h3>
                        <p className="text-neutral-400 mb-8 h-12">View real-time metrics, evaluation scores, and governance reports.</p>
                        <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium hover:gap-4 transition-all">
                            Launch Dashboard <span className="text-blue-500">→</span>
                        </a>
                    </div>

                    <div className="group relative p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10">
                        <div className="absolute top-8 right-8 text-neutral-600 group-hover:text-purple-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-white">Documentation</h3>
                        <p className="text-neutral-400 mb-8 h-12">Access integration guides, intent definitions, and API references.</p>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors">View Sops</button>
                            <button className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm font-medium transition-colors">Glossary</button>
                        </div>
                    </div>
                </div>

                <footer className="pt-12 border-t border-neutral-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} BIASED Framework. All systems nominal.</p>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('biased_auth');
                            router.push('/biasedAdmin/login');
                        }}
                        className="hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                </footer>
            </div>
        </div>
    );
}
