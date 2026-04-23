"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

type MediaCard = {
    label: string
    type: "image" | "video"
    src: string
    poster?: string
}

const MEDIA_CARDS: MediaCard[] = [
    {
        label: "Payload Chart",
        type: "image",
        src: "/images/payload-chart.png",
    },
    {
        label: "Alta X In Action",
        type: "video",
        src: "/videos/alta-x.mp4",
        poster: "/images/drone.png",
    },
]

function MediaModal({ card, onClose }: { card: MediaCard; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative max-w-4xl w-[90vw]"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-bold tracking-widest uppercase transition-colors"
                    >
                        ✕ Close
                    </button>
                    {card.type === "image" ? (
                        <img
                            src={card.src}
                            alt={card.label}
                            className="w-full rounded-sm object-contain max-h-[80vh]"
                        />
                    ) : (
                        <video
                            src={card.src}
                            poster={card.poster}
                            controls
                            autoPlay
                            className="w-full rounded-sm max-h-[80vh]"
                        />
                    )}
                    <p className="mt-3 text-center text-white/60 text-[10px] font-bold tracking-widest uppercase">
                        {card.label}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

const MAX_WEIGHT = 40
const STEP = 5
const MAX_MINUTES = 50
const BAR_HEIGHT = 192 // px, matches h-48

const LEFT_PAYLOADS = [
    { name: "No Payload", weight: 0, minutes: 50 },
    { name: "Phoenix LiDAR", weight: 11, minutes: 30 },
]

const RIGHT_PAYLOADS = [
    { name: "Mövi Carbon", weight: 22, minutes: 22 },
    { name: "Mapping Camera", weight: 8, minutes: 35 },
]

const ALL_PAYLOADS = [...LEFT_PAYLOADS, ...RIGHT_PAYLOADS]

const LAYER_COLORS = [
    "bg-layer-1", "bg-layer-2", "bg-layer-3", "bg-layer-4",
    "bg-layer-5", "bg-layer-6", "bg-layer-7", "bg-layer-8",
]

function calcFlightTime(weight: number) {
    return Math.max(Math.round(55 - weight * 1.1), 10)
}

function calcThrustRatio(weight: number) {
    return Math.max(4.8 - weight * 0.075, 1.5).toFixed(1) + " : 1"
}

function DroneSVG({ className }: { className?: string }) {
    return (
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className={className}>
            <circle cx="20" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="30" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="0" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="40" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="12" x2="8" y2="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="24" y1="12" x2="32" y2="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

function ProgressBar({ name, weight, minutes, isActive }: {
    name: string
    weight: number
    minutes: number
    isActive: boolean
}) {
    const fillHeight = (minutes / MAX_MINUTES) * BAR_HEIGHT
    const dotBottom = fillHeight - 6

    return (
        <div className="flex flex-col items-center gap-4">
            <DroneSVG className={`transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-400"}`} />

            <div className="text-center">
                <span className={`font-black text-3xl tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-500"}`}>
                    {minutes}
                </span>
                <p className={`text-[9px] font-bold uppercase tracking-widest leading-tight transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-500"}`}>
                    Minute<br />Flight
                </p>
            </div>

            <div className="relative flex justify-center h-48 w-4">
                <div className="w-0.5 h-full bg-neutral-400/30 rounded-full absolute" />
                <motion.div
                    className={`w-0.5 rounded-full absolute bottom-0 transition-colors duration-300 ${isActive ? "bg-white" : "bg-neutral-400/50"}`}
                    animate={{ height: fillHeight }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.div
                    className={`w-3 h-3 rounded-full border-2 absolute z-10 -translate-x-1/2 left-1/2 transition-colors duration-300 ${isActive ? "bg-white border-white" : "bg-neutral-400 border-neutral-400"}`}
                    animate={{ bottom: dotBottom }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            <div className="text-center mt-1">
                <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-500"}`}>
                    {name}
                </p>
                <div className={`mt-1 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest transition-colors duration-300 ${isActive ? "bg-white text-neutral-800" : "bg-neutral-400/30 text-neutral-500"}`}>
                    {weight} LBS
                </div>
            </div>
        </div>
    )
}

export default function PayloadWeight() {
    const [weight, setWeight] = useState(0)
    const [activeCard, setActiveCard] = useState<MediaCard | null>(null)

    const layerCount = weight / STEP
    const flightTime = calcFlightTime(weight)
    const thrustRatio = calcThrustRatio(weight)

    const activePayload = ALL_PAYLOADS.reduce((closest, p) =>
        Math.abs(p.weight - weight) < Math.abs(closest.weight - weight) ? p : closest
    )

    return (
        <section className="relative w-full min-h-[125vh] overflow-hidden bg-[linear-gradient(to_bottom,#798a9f_0%,#c8dff0_48%,#8ab5d4_100%)] flex flex-col items-center justify-center py-20 px-6">



            {/* Bars + Drone + Bars */}
            <div className="flex items-center justify-center gap-16">

                {/* Left progress bars */}
                <div className="flex gap-12">
                    {LEFT_PAYLOADS.map(p => (
                        <ProgressBar
                            key={p.name}
                            {...p}
                            isActive={activePayload.name === p.name}
                        />
                    ))}
                </div>

                {/* Center: Drone + Layers */}
                <div className="flex flex-col items-center flex-shrink-0">
                    <Image
                        src="/images/drone.png"
                        alt="Drone"
                        width={400}
                        height={250}
                        className="object-contain max-w-[40vw]"
                        priority
                    />
                    <div className="w-64 flex flex-col gap-0.5">
                        <AnimatePresence initial={false}>
                            {Array.from({ length: layerCount }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 24, opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className={`w-full overflow-hidden rounded-sm flex items-center justify-center ${LAYER_COLORS[i] ?? "bg-layer-8"}`}
                                >
                                    <span className="text-white/60 text-[9px] font-bold tracking-widest uppercase whitespace-nowrap">
                                        {(i + 1) * STEP} LBS
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div className="h-1 w-full bg-neutral-400/30 rounded-sm" />
                    </div>
                </div>

                {/* Right progress bars */}
                <div className="flex gap-12">
                    {RIGHT_PAYLOADS.map(p => (
                        <ProgressBar
                            key={p.name}
                            {...p}
                            isActive={activePayload.name === p.name}
                        />
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="mt-16 w-full max-w-xl">
                <div className="bg-drone-panel/90 backdrop-blur-sm rounded-sm px-6 py-5 flex items-center gap-3">

                    <div className="flex-1 text-center">
                        <p className="text-neutral-400 text-[9px] font-bold tracking-widest uppercase mb-1">
                            Flight Time
                        </p>
                        <motion.p
                            key={flightTime}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white text-3xl font-black leading-none"
                        >
                            {flightTime}
                            <span className="text-sm font-bold ml-1">MIN</span>
                        </motion.p>
                    </div>

                    <button
                        onClick={() => setWeight(w => Math.max(w - STEP, 0))}
                        disabled={weight === 0}
                        className="w-11 h-11 rounded-full border border-neutral-600 flex items-center justify-center text-white text-2xl font-bold hover:bg-white/10 transition-colors disabled:opacity-25 disabled:cursor-not-allowed shrink-0"
                    >
                        −
                    </button>

                    <div className="w-20 text-center shrink-0">
                        <p className="text-neutral-400 text-[9px] font-bold tracking-widest uppercase mb-1">
                            Weight
                        </p>
                        <motion.p
                            key={weight}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-white text-3xl font-black leading-none"
                        >
                            {weight}
                            <span className="text-sm font-bold ml-1">LBS</span>
                        </motion.p>
                    </div>

                    <button
                        onClick={() => setWeight(w => Math.min(w + STEP, MAX_WEIGHT))}
                        disabled={weight === MAX_WEIGHT}
                        className="w-11 h-11 rounded-full border border-neutral-600 flex items-center justify-center text-white text-2xl font-bold hover:bg-white/10 transition-colors disabled:opacity-25 disabled:cursor-not-allowed shrink-0"
                    >
                        +
                    </button>

                    <div className="flex-1 text-center">
                        <p className="text-neutral-400 text-[9px] font-bold tracking-widest uppercase mb-1">
                            Thrust Ratio
                        </p>
                        <motion.p
                            key={thrustRatio}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-white text-2xl font-black leading-none"
                        >
                            {thrustRatio}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Media Cards */}
            <div className="mt-14 flex gap-4">
                {MEDIA_CARDS.map(card => (
                    <button
                        key={card.label}
                        onClick={() => setActiveCard(card)}
                        className="group relative w-52 h-32 bg-drone-panel/90 backdrop-blur-sm rounded-sm overflow-hidden border border-neutral-600/40 hover:border-neutral-400/60 transition-all duration-300"
                    >
                        {card.poster && (
                            <img
                                src={card.poster}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                            />
                        )}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-neutral-400/60 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white transition-colors duration-300">
                                {card.type === "video" ? (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                        <polygon points="3,1 13,7 3,13" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" fill="none">
                                        <line x1="7" y1="2" x2="7" y2="12" />
                                        <line x1="2" y1="7" x2="12" y2="7" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white/90 transition-colors duration-300">
                                {card.label}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {activeCard && (
                <MediaModal card={activeCard} onClose={() => setActiveCard(null)} />
            )}
        </section>
    )
}
