import Reveal from "./Reveal";

export default function DeployCTA() {
  return (
    <section id="deploy" className="relative scroll-mt-16 overflow-hidden border-b border-edge">
      {/* glow field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(74,255,127,0.10), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <Reveal>
          <p className="term-label">production checklist: cute ✓ soft ✓ personalized ✓</p>
          <h2 className="pixel glow mt-6 text-[clamp(3rem,8vw,6.4rem)] leading-[0.92]">
            ship it to prod
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[14.5px] text-fg-dim">
            Personalized builds compile in 2–4 days and deploy anywhere in
            India. Rollbacks accepted within 7 days, though nobody has ever
            wanted one.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages"
              className="border border-phos bg-phos px-8 py-4 text-[14px] font-bold tracking-[0.1em] text-crt transition-colors hover:bg-transparent hover:text-phos"
            >
              $ deploy baby --prod
            </a>
            <a
              href="#releases"
              className="border border-edge px-8 py-4 text-[14px] font-bold tracking-[0.1em] text-fg transition-colors hover:border-phos-dim hover:text-phos"
            >
              --dry-run (browse)
            </a>
          </div>
          <p className="mt-8 text-[12.5px] text-fg-dim">
            exit code 0 · every time
          </p>
        </Reveal>
      </div>
    </section>
  );
}
