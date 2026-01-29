'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Something went wrong!</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-[#1a2744] text-white rounded-md hover:opacity-90 transition-opacity"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
