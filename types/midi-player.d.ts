// <midi-player> web component from html-midi-player (loaded in app/layout.tsx).
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "midi-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                "sound-font"?: string;
                visualizer?: string;
            };
        }
    }
}
