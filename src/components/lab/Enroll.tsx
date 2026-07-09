import Reveal from "./Reveal";

/** Closing call to action — enrolment into the institute. */
export default function Enroll() {
  return (
    <section className="rule-b relative overflow-hidden bg-litmus text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <Reveal>
          <p className="label text-paper/75">Admissions open · rolling deadline</p>
          <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.6rem,6vw,5.2rem)]">
            Enroll your specimen{" "}
            <span className="display-i">today.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-paper/85">
            Admission requirements: one small human, aged 0–24 months.
            Tuition starts at ₹449. Every graduate receives a very soft tee.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#specimens"
              className="label inline-flex items-center gap-3 bg-ink px-8 py-4 font-semibold text-paper transition-transform hover:-translate-y-0.5"
            >
              Begin admission <span aria-hidden>→</span>
            </a>
            <a
              href="#study"
              className="label inline-flex items-center gap-3 border border-paper/60 px-8 py-4 font-semibold text-paper transition-colors hover:bg-paper hover:text-litmus"
            >
              Review the data
            </a>
          </div>
        </Reveal>
      </div>

      {/* oversized watermark */}
      <p
        aria-hidden="true"
        className="display-i pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] leading-none text-paper/10 select-none"
      >
        tiny lab
      </p>
    </section>
  );
}
