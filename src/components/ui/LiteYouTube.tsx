import Image from "next/image";

type LiteYouTubeProps = {
  videoId: string;
  title: string;
  poster: { src: string; alt: string };
};

/**
 * Opens the video on YouTube in a new tab. We link out instead of embedding
 * because this particular video carries a music copyright claim (LatinAutor -
 * UMPG) that disables third-party embedding. If that claim is ever cleared in
 * YouTube Studio, this can be swapped back to an inline <iframe> embed.
 */
export default function LiteYouTube({ videoId, title, poster }: LiteYouTubeProps) {
  const watchUrl = `https://youtu.be/${videoId}`;

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver en YouTube: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink"
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

      <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-paper/90 uppercase">
        Ver en YouTube
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 13L13 3M13 3H5M13 3V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
