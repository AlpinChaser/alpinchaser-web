import { getAllPasses } from "@/lib/passes";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const passes = getAllPasses();

  return (
    <main>
      <HeroSection passes={passes} />
    </main>
  );
}
