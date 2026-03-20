import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
    title: "Gama Web",
    description: "Gama Web sitesi",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
        <body>
        <Navbar />
        <main className="pt-32">
            {children}
        </main>
        </body>
        </html>
    )
}