"use client"

import { useState, useEffect } from "react"
import { NAV_LINKS2, NAV_LINKS1 } from "@/lib/data"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40)
        window.addEventListener("scroll", fn)
        return () => window.removeEventListener("scroll", fn)
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div style={{ backgroundColor: "rgb(239, 245, 255)" }} className={`flex items-center h-9 px-10 ${scrolled ? "shadow-md" : ""}`}>
                <input
                    type="text"
                    placeholder="Ara..."
                    className="ml-auto border border-neutral-300 rounded px-3 py-1.5 text-sm outline-none focus:border-orange-500"
                />
                <button className="bg-orange-500 text-white text-xs font-bold uppercase px-4 py-2 hover:bg-orange-600 transition-colors">
                    Join
                </button>
            </div>
            <div style={{ backgroundColor: "black" }} className={`flex items-center h-12 px-10 ${scrolled ? "shadow-md" : ""}`}>
      <span className="text-lg font-white tracking-wider text-white">
        GAMA
      </span>
            <div className="flex ml-8 flex-1 justify-between">
                <div className="flex">
                    {NAV_LINKS2.filter((link) => !link.alignRight).map((link) => (
                        <a key={link.label} href={link.href} className="text-xs font-semibold uppercase px-4 h-12 flex items-center text-neutral-500 hover:text-orange-500">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex">
                    {NAV_LINKS2.filter((link) => link.alignRight).map((link) => (
                        <a key={link.label} href={link.href} className="text-xs font-semibold uppercase px-4 h-12 flex items-center text-neutral-500 hover:text-orange-500">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>



        </div>
            <div style={{ backgroundColor: "#eaeaea" }} className={`flex items-center h-10 px-10 ${scrolled ? "fixed top-[84px] left-0 right-0 z-50" : "fixed top-[84px] left-0 right-0 z-50"}`}>
                      <span className="text-lg font-white tracking-wider text-#bdbdbd">
        ALTA X
      </span>
                <div className="flex ml-8 flex-1 justify-between ">
                    <div className="flex">
                        {NAV_LINKS1.filter((link) => !link.alignRight).map((link) => (
                            <a key={link.label} href={link.href} className="text-xs font-semibold uppercase px-4 h-12 flex items-center text-neutral-500 hover:text-orange-500">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex">
                        {NAV_LINKS1.filter((link) => link.alignRight).map((link) => (
                            <a key={link.label} href={link.href} className="text-xs font-semibold uppercase px-4 h-12 flex items-center text-neutral-500 hover:text-orange-500">
                                {link.label}
                            </a>
                        ))}
                        <button className="text-xs font-semibold uppercase px-4 h-12 flex items-center text-neutral-500 hover:text-orange-500">
                            Join
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}