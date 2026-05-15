import { getAllPasses } from "@/lib/passes";
import { getMessages, getLocale } from "@/lib/i18n";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const passes = getAllPasses();
  const messages = getMessages();
  const locale = getLocale();

  return (
    <main>
      <HeroSection passes={passes} messages={messages} locale={locale} />
    </main>
  );
}
