import Reveal from "@/components/ui/Reveal";
import LiteYouTube from "@/components/ui/LiteYouTube";
import { speakerReel } from "@/config/siteConfig";

export default function SpeakerReel() {
  return (
    <section className="relative bg-ink-soft px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            {speakerReel.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 w-full max-w-3xl">
            <LiteYouTube
              videoId={speakerReel.videoId}
              title={speakerReel.title}
              poster={speakerReel.poster}
            />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted">
            {speakerReel.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
