import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ACCESSIBILITY_SCRIPT } from "@/components/AccessibilityMenu";
import { Header } from "@/components/Header";
import "./styles/globals.css";

export const metadata: Metadata = {
    title: "GIS Day",
    // Fallback for pages that don't set their own.
    description: "Pittsburgh GIS Day 2026, November 13 at Carnegie Mellon University's Cohon University Center.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // The head script adds accessibility classes before hydration.
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: ACCESSIBILITY_SCRIPT }} />
            </head>
            <body>
                <Header />
                {children}
                {/* Registers the <midi-player> web component. */}
                <Script
                    src="https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.23.1/es6/core.js,npm/html-midi-player@1.5.0"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
