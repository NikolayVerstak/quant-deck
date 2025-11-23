import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/styles/global.scss'
import { QueryProvider } from '@/providers/query-provider'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'QuantDeck - Stock Analytics Dashboard',
    description:
        'A fast, data-driven dashboard providing quant insights, rankings, and financial metrics.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    )
}
