import { transliterate } from 'indic-transliterate';

export function toDevanagari(name) {
  if (!name) return '';

  let s = name.toLowerCase().trim();

  s = s.replace(/a\b/g, 'aa');

  s = s.replace(/\bsingh\b/gi, 'simgh');

  return transliterate(s, 'devanagari');
}
