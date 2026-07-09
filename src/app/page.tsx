import LabNav from "@/components/lab/LabNav";
import Hero from "@/components/lab/Hero";
import Ticker from "@/components/lab/Ticker";
import Protocol from "@/components/lab/Protocol";
import PeriodicShop from "@/components/lab/PeriodicShop";
import GrowthChart from "@/components/lab/GrowthChart";
import Findings from "@/components/lab/Findings";
import Enroll from "@/components/lab/Enroll";
import Colophon from "@/components/lab/Colophon";
import CursorReadout from "@/components/lab/CursorReadout";

export default function Home() {
  return (
    <>
      <LabNav />
      <main>
        <Hero />
        <Ticker />
        <Protocol />
        <PeriodicShop />
        <GrowthChart />
        <Findings />
        <Enroll />
      </main>
      <Colophon />
      <CursorReadout />
    </>
  );
}
