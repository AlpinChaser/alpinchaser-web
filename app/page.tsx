import { getAllPasses } from "@/lib/passes";
import HeroSection from "@/components/HeroSection";
import de from "@/messages/de.json";

export default function Home() {
  const passes = getAllPasses();
  return (
    <main>
      <HeroSection passes={passes} messages={de} locale="de" />
    </main>
  );
}
