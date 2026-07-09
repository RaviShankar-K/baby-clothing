import BootScreen from "@/components/term/BootScreen";
import TermNav from "@/components/term/TermNav";
import HeroTerm from "@/components/term/HeroTerm";
import Changelog from "@/components/term/Changelog";
import PkgGrid from "@/components/term/PkgGrid";
import Dmesg from "@/components/term/Dmesg";
import DeployCTA from "@/components/term/DeployCTA";
import ManFooter from "@/components/term/ManFooter";
import TmuxBar from "@/components/term/TmuxBar";

export default function Home() {
  return (
    <>
      <BootScreen />
      <TermNav />
      <main>
        <HeroTerm />
        <Ticker />
        <Changelog />
        <PkgGrid />
        <Dmesg />
        <DeployCTA />
      </main>
      <ManFooter />
      <TmuxBar />
    </>
  );
}

const NOTICES = [
  "uptime: 247 days without a scratchy tag",
  "kernel panic averted: snack delivered",
  "all prints OEKO-TEX certified — safe for tiny kernels",
  "git blame says the baby did it",
  "sudo make me a bottle — permission granted",
  "99.9% nap availability not guaranteed",
];

function Ticker() {
  return (
    <div className="marquee overflow-hidden border-b border-edge bg-panel py-3">
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {NOTICES.map((n) => (
              <span key={n} className="flex items-center px-6 text-[12px] tracking-[0.14em] text-fg-dim uppercase">
                <span className="glow mr-6">*</span>
                {n}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
