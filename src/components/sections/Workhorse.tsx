import Link from "next/link"
import Image from "next/image"

export default function Workhorse() {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">
            <Image
                src="/images/workhorse.png"
                alt="Alta X technical details"
                fill
                className="object-cover opacity-80"
            />

            <div className="absolute top-24 left-0 right-0 text-center px-6 sm:px-20 z-10 animate-reveal animate-delay-1">
                <h1 className="text-white text-4xl sm:text-6xl font-black italic mb-6 tracking-tighter uppercase">
                    Industrial workhorse.
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    We designed Alta X from the ground up to capitalize on the
                    benefits of large, efficient props while maintaining the crisp
                    control and unmatched precision the Alta line is known for.
                </p>
            </div>

            {/* Actions */}
            <div className="absolute bottom-16 left-0 right-0 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-32 z-10">
                <Link href="/promo" className="group flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                    <span className="group-hover:text-brand-orange transition-colors">Watch the Promo</span>
                    <span className="w-10 h-10 rounded-full border-2 border-white group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all flex items-center justify-center text-[10px]">▶</span>
                </Link>
                <Link href="/scenes" className="group flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                    <span className="group-hover:text-brand-orange transition-colors">Behind the Scenes</span>
                    <span className="w-10 h-10 rounded-full border-2 border-white group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all flex items-center justify-center text-[10px]">▶</span>
                </Link>
            </div>
        </section>
    )
}