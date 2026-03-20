import Link from "next/link"

export default function Workhorse() {
    return (
        <section style={{ height: "100vh" }} className="relative w-full bg-black">

            <img
                src="/workhorse.png"
                alt="workhorse"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute top-16 left-0 right-0 text-center px-20">
                <h1 className="text-white text-6xl font-black italic mb-6">
                    Industrial workhorse.
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                    We designed Alta X from the ground up to capitalize on the
                    benefits of large, efficient props while maintaining the crisp
                    control and unmatched precision the Alta line is known for.
                </p>
            </div>

            {/* Alt */}
            <div style={{ bottom: "64px" }} className="absolute left-0 right-0 flex justify-center gap-32">
                <Link href="/promo" className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm">
                    <span>Watch the Promo</span>
                    <span className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs">▶</span>
                </Link>
                <Link href="/scenes" className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm">
                    <span>Behind the Scenes</span>
                    <span className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs">▶</span>
                </Link>
            </div>

        </section>
    )
}