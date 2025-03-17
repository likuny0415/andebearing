import en from './en';
import zh from './zh';
import ja from './ja';

export const translations = {
  en,
  zh,
  ja,
};

export type Language = keyof typeof translations;

export default translations; 