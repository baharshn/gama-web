"use client"

import { NAV_LINKS2, NAV_LINKS1 } from "@/config/navigation"
import type { NavLink } from "@/types"
import { useScroll } from "@/hooks/useScroll"

export default function Navbar() {
    const scrolled = useScroll(40)

    const NavGroup = ({ links, className }: { links: NavLink[], className?: string }) => (
        <div className={`flex flex-1 justify-between ${className}`}>
            <div className="flex">
                {links.filter(link => !link.alignRight).map(link => (
                    <NavLinkItem key={link.label} link={link} />
                ))}
            </div>
            <div className="flex">
                {links.filter(link => link.alignRight).map(link => (
                    <NavLinkItem key={link.label} link={link} />
                ))}
            </div>
        </div>
    )

    const NavLinkItem = ({ link }: { link: NavLink }) => (
        <a
            href={link.href}
            className="text-[10px] sm:text-xs font-semibold uppercase px-3 sm:px-4 h-full flex items-center text-neutral-500 hover:text-brand-orange transition-colors"
        >
            {link.label}
        </a>
    )

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
            {/* Top Bar - Light */}
            <div className="flex items-center h-[var(--nav-height-top)] px-6 sm:px-10 bg-[var(--nav-bg-light)]">
                <div className="ml-auto flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Ara..."
                        className="bg-white border border-neutral-200 rounded px-3 py-1 text-xs outline-none focus:border-brand-orange transition-all"
                    />
                    <button className="bg-brand-orange text-white text-[10px] font-bold uppercase px-4 h-6 hover:bg-brand-orange-hover transition-colors rounded-sm tracking-widest">
                        Join
                    </button>
                </div>
            </div>

            {/* Mid Bar - Black */}
            <div className="flex items-center h-[var(--nav-height-mid)] px-6 sm:px-10 bg-[var(--nav-bg-dark)]">
                <span className="text-xl font-black italic tracking-tighter text-white mr-8">
                    GAMA
                </span>
                <NavGroup links={NAV_LINKS2} />
            </div>

            {/* Bottom Bar - Gray */}
            <div
                className={`flex items-center h-[var(--nav-height-bottom)] px-6 sm:px-10 bg-[var(--nav-bg-gray)] transition-all ${
                    scrolled ? "shadow-md" : ""
                }`}
            >
                <span className="text-sm font-bold tracking-widest text-neutral-400 mr-8">
                    ALTA X
                </span>
                <NavGroup links={NAV_LINKS1} />
                <button className="bg-transparent text-neutral-500 hover:text-brand-orange text-[10px] font-bold uppercase tracking-widest px-4 h-full flex items-center transition-colors">
                    Join
                </button>
            </div>
        </nav>
    )
}