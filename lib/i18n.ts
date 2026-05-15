import { headers, cookies } from 'next/headers';
import de from '@/messages/de.json';
import en from '@/messages/en.json';

const messages = { de, en } as const;
export type Locale = keyof typeof messages;
export type AppMessages = typeof de;

export function getLocale(): Locale {
  // 1. Cookie has priority (user explicitly switched)
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  if (cookieLocale === 'en' || cookieLocale === 'de') return cookieLocale;

  // 2. Fallback: Accept-Language header
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';
  return acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'de';
}

export function getMessages(): AppMessages {
  return messages[getLocale()];
}
