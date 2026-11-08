import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import "./styles/globals.css";

export const metadata: Metadata = { title: "GIS Day" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
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
