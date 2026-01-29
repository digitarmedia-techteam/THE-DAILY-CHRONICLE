'use client'

import { useEffect, useState } from 'react'

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        // Start fade out after 1.8 seconds
        const fadeTimer = setTimeout(() => {
            setOpacity(0)
        }, 800)

        // Complete unmount after fade completes
        const hideTimer = setTimeout(() => {
            setIsVisible(false)
        }, 300) // 1800ms + 500ms fade duration

        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 z-[9999] bg-[#1a2744] flex items-center justify-center transition-opacity duration-500 ease-out"
            style={{ opacity }}
        >
            <div className="flex flex-col items-center gap-8">
                {/* Logo with pulse animation */}
                <div className="relative animate-fade-in">
                    <img
                        src="/icon.svg"
                        alt="Globex News"
                        className="w-24 h-24 md:w-32 md:h-32 relative z-10"
                    />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-pulse-ring" />
                </div>

                {/* Brand name */}
                <div className="text-center animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        <span className="text-white">globex</span>
                        <span className="text-blue-400">.news</span>
                    </h1>
                    <p className="text-white/60 text-sm mt-2 font-medium tracking-widest uppercase">
                        Your World, Delivered
                    </p>
                </div>

                {/* Animated clock loader */}
                <div className="relative w-16 h-16 animate-fade-in-delayed">
                    {/* Clock circle */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/20" />

                    {/* Hour hand */}
                    <div className="absolute top-1/2 left-1/2 origin-bottom animate-clock-hour"
                        style={{ width: '2px', height: '20px', marginLeft: '-1px', marginTop: '-20px' }}>
                        <div className="w-full h-full bg-white rounded-full" />
                    </div>

                    {/* Minute hand */}
                    <div className="absolute top-1/2 left-1/2 origin-bottom animate-clock-minute"
                        style={{ width: '2px', height: '28px', marginLeft: '-1px', marginTop: '-28px' }}>
                        <div className="w-full h-full bg-blue-400 rounded-full" />
                    </div>

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Loading text */}
                <div className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    Loading News...
                </div>
            </div>
        </div>
    )
}
