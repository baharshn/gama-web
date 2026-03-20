import Image from "next/image"

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black animate-reveal">
            <Image
                src="/images/hero.png"
                alt="Alta X Industrial Drone in flight"
                fill
                className="object-cover transition-scale duration-500 hover:scale-105"
                priority
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </section>
    )
}