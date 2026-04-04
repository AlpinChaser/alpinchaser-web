import { getAllPasses } from "@/lib/passes";
import HeroSection from "@/components/HeroSection";
import MapView from "@/components/MapView";

export default function Home() {
  const passes = getAllPasses();

  return (
    <main>
      <HeroSection passCount={passes.length} />

      <section id="map" className="relative w-full h-screen">
        <MapView passes={passes} />
      </section>
    </main>
  );
}
