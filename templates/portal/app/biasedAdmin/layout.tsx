import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

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
        <div className={`min-h-screen bg-neutral-950 text-neutral-100 ${inter.className}`}>
            {/* Subtle Grid Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            <main className="relative z-10">{children}</main>
        </div>
    );
}
