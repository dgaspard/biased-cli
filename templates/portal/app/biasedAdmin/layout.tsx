import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
    title: "BIASED Admin",
    description: "Governance & Evaluation Portal",
};

export default function BiasedAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`min-h-screen bg-gray-50 ${openSans.className}`}>
            {/* Subtle Light Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3B7B4B 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <main className="relative z-10">{children}</main>
        </div>
    );
}
