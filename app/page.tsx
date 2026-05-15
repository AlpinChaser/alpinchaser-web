import { getAllPasses } from "@/lib/passes";
import { getMessages, getLocale } from "@/lib/i18n";
import HeroSection from "@/components/HeroSection";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const passes = getAllPasses();
  const messages = getMessages();
  const locale = getLocale();

  return (
    <main>
      <HeroSection passes={passes} messages={messages} locale={locale} />
    </main>
  );
}
