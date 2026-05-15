import de from '@/messages/de.json';
import en from '@/messages/en.json';

const messages = { de, en } as const;
export type Locale = keyof typeof messages;
export type AppMessages = typeof de;

export function getLocale(): Locale {
  return 'de';
}

export function getMessages(): AppMessages {
  return de;
}
