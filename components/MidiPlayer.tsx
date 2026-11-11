"use client";

import { useEffect, useRef } from "react";

const SOUND_FONT = "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus";

/**
 * <midi-player> (html-midi-player, loaded in app/layout.tsx) with accessible
 * names. The player's controls live in its shadow root and ship without
 * labels: the play button is an icon-only <button> and the seek bar an
 * unlabeled <input type="range">. The shadow root is open, so we label them
 * once the element is defined, and keep the button's label in sync with
 * play/stop.
 */
export function MidiPlayer({ src, title = "Background music" }: { src: string; title?: string }) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const player = ref.current;
        if (!player) return;
        let cancelled = false;
        let cleanup = () => {};

        customElements.whenDefined("midi-player").then(() => {
            const root = player.shadowRoot;
            if (cancelled || !root) return;
            const button = root.querySelector<HTMLButtonElement>("button.play");
            const seekBar = root.querySelector<HTMLInputElement>("input.seek-bar");

            const setButton = (playing: boolean) =>
                button?.setAttribute("aria-label", `${playing ? "Stop" : "Play"} ${title.toLowerCase()}`);
            setButton(false);
            seekBar?.setAttribute("aria-label", `${title} position`);

            const onStart = () => setButton(true);
            const onStop = () => setButton(false);
            player.addEventListener("start", onStart);
            player.addEventListener("stop", onStop);
            cleanup = () => {
                player.removeEventListener("start", onStart);
                player.removeEventListener("stop", onStop);
            };
        });

        return () => {
            cancelled = true;
            cleanup();
        };
    }, [title]);

    return (
        <midi-player ref={ref} role="group" aria-label={title} src={encodeURI(src)} sound-font={SOUND_FONT} />
    );
}
