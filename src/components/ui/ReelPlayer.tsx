"use client";

import { useState } from "react";
import Image from "next/image";

type ReelPlayerProps = {
  src: string;
  title: string;
  poster: { src: string; alt: string };
};

/**
 * Self-hosted video with a branded poster + play-button facade. The <video>
 * element is only mounted after the user clicks play, so nothing downloads on
 * page load — the clip streams (faststart) only when actually requested.
 */
export default function ReelPlayer({ src, title, poster }: ReelPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative aspect-[43/27] w-full overflow-hidden rounded-2xl border border-line bg-black">
      {playing ? (
        <video
          src={src}
          poster={poster.src}
          className="absolute inset-0 h-full w-full"
          controls
          autoPlay
          playsInline
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Reproducir video: ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster.src}
            alt={poster.alt}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/45" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-ink/60 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 5.5V18.5L19 12L8 5.5Z" fill="var(--gold)" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
