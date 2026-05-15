import { headers } from 'next/headers';
import de from '@/messages/de.json';
import en from '@/messages/en.json';

const messages = { de, en } as const;

export type Locale = keyof typeof messages;
export type AppMessages = (typeof messages)[Locale];

export function getLocale(): Locale {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  return acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'de';
}

export function getMessages() {
  const locale = getLocale();
  return messages[locale];
}
