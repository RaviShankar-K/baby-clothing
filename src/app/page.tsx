import StoryNav from "@/components/story/StoryNav";
import HeroStory from "@/components/story/HeroStory";
import GrowthPath from "@/components/story/GrowthPath";
import Collection from "@/components/story/Collection";
import HowItWorks from "@/components/story/HowItWorks";
import NurseryNotes from "@/components/story/NurseryNotes";
import CTABand from "@/components/story/CTABand";
import StoryFooter from "@/components/story/StoryFooter";

export default function Home() {
  return (
    <>
      <StoryNav />
      <main>
        <HeroStory />
        <Ticker />
        <GrowthPath />
        <Collection />
        <HowItWorks />
        <NurseryNotes />
        <CTABand />
      </main>
      <StoryFooter />
    </>
  );
}

const LINES = [
  "chapter one: hello, world",
  "chapter six: solid foods, stronger opinions",
  "chapter nine: a standing ovation (for oneself)",
  "chapter twelve: there is cake and it is personal",
  "every tee pre-washed, every giggle included",
  "personalized with your hero's name",
];

function Ticker() {
  return (
    <div className="marquee overflow-hidden border-b-[2.5px] border-ink bg-sage py-3 text-white">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {LINES.map((l) => (
              <span key={l} className="story-soft flex items-center px-6 text-[14px] tracking-[0.08em]">
                <span className="mr-6 text-butter">✿</span>
                {l}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
