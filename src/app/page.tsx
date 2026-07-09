import Hero from "@/components/sections/Hero";
import AuthorityStrip from "@/components/sections/AuthorityStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import SpeakerPromise from "@/components/sections/SpeakerPromise";
import Topics from "@/components/sections/Topics";
import Formats from "@/components/sections/Formats";
import Experience from "@/components/sections/Experience";
import SpeakerReel from "@/components/sections/SpeakerReel";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <main className="pb-20 md:pb-0">
        <Hero />
        <AuthorityStrip />
        <SpeakerReel />
        <ProblemSection />
        <SpeakerPromise />
        <Topics />
        <Formats />
        <Experience />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
      <StickyCTA />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
