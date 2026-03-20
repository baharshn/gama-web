import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
    title: "GAMA | Industrial UAV Systems",
    description: "Empowering professional drone operators with the world's most capable industrial flight platforms.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
        <body className="antialiased selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main className="pt-[var(--total-nav-height)]">
            {children}
        </main>
        </body>
        </html>
    )
}