export const TOTAL_PAGES = 48;
export const NARRATED_PAGES = 40;

export const pageImage = (n) => `/booklet/page${n}.webp`;
export const pageAudio = (n) => `/audio/page${n}.mp3`;
export const FLIP_SOUND = '/audio/flip.mpeg';

export const hasNarration = (page) => page >= 1 && page <= NARRATED_PAGES;
