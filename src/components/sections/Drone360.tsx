"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useMotionValue } from "framer-motion"

const VIDEO_DURATION = 21
const THUMB_W = 20

export default function Drone360() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const [maxX, setMaxX] = useState(1)
    const x = useMotionValue(0)

    useEffect(() => {
        const measure = () => {
            if (trackRef.current) {
                setMaxX(Math.max(trackRef.current.offsetWidth - THUMB_W, 1))
            }
        }
        measure()
        const ro = new ResizeObserver(measure)
        if (trackRef.current) ro.observe(trackRef.current)
        return () => ro.disconnect()
    }, [])

    const applyPct = useCallback((pct: number) => {
        if (fillRef.current) fillRef.current.style.width = `${pct * 100}%`
        if (videoRef.current) videoRef.current.currentTime = pct * VIDEO_DURATION
    }, [])

    useEffect(() => {
        return x.on("change", (latest) => {
            applyPct(Math.max(0, Math.min(latest / maxX, 1)))
        })
    }, [x, maxX, applyPct])

    const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!trackRef.current) return
        const rect = trackRef.current.getBoundingClientRect()
        const clamped = Math.max(0, Math.min(e.clientX - rect.left - THUMB_W / 2, maxX))
        x.set(clamped)
        applyPct(clamped / maxX)
    }, [maxX, x, applyPct])

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#ede9fe_0%,#ffffff_42%)] flex flex-col px-10 md:px-20 py-16">

            {/* Text */}
            <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-2xl mx-auto text-center text-neutral-800 text-2xl md:text-3xl font-medium leading-snug"
            >
                Alta X folds to{" "}
                <strong className="font-black">half its normal size</strong>{" "}
                with the push of a finger. The folding linkages stiffen the booms to ensure{" "}
                <span className="font-light text-neutral-400">low vibration</span>{" "}
                and precise flight characteristics.
            </motion.p>

            {/* Video */}
            <div className="flex-1 flex items-center justify-center py-10">
                <video
                    ref={videoRef}
                    src="/videos/drone-360.mp4"
                    className="max-h-[58vh] max-w-[85%] object-contain"
                    playsInline
                    preload="auto"
                    muted
                />
            </div>

            {/* Slider */}
            <div className="w-full max-w-lg mx-auto pb-14 select-none">
                <div className="flex items-center gap-5">
                    <span className="text-neutral-400 text-base shrink-0">←</span>

                    <div
                        ref={trackRef}
                        className="relative flex-1 h-8 flex items-center cursor-pointer"
                        onClick={handleTrackClick}
                    >
                        {/* Track background */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-neutral-300" />

                        {/* Fill — width set imperatively via fillRef */}
                        <div
                            ref={fillRef}
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-neutral-700 w-0 pointer-events-none"
                        />

                        {/* Thumb */}
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: maxX }}
                            dragElastic={0}
                            dragMomentum={false}
                            style={{ x }}
                            onClick={e => e.stopPropagation()}
                            whileDrag={{ scale: 1.25 }}
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-neutral-700 shadow-md cursor-grab active:cursor-grabbing"
                        />
                    </div>

                    <span className="text-neutral-400 text-base shrink-0">→</span>
                </div>

                <div className="flex justify-between mt-2 text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                    <span>Left</span>
                    <span>Right</span>
                </div>
            </div>
        </section>
    )
}
