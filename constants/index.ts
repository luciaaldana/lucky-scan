import { TLotteryHits } from '@/types';

export const ROUTES = {
  HOME: '/' as const,
  PHOTO: '/photo' as const,
  RESULTS: '/results' as const,
  SETTINGS: '/settings' as const,
};

export const minNecessaryLotteryHits: TLotteryHits = {
  LA_SEGUNDA: 4,
  TRADICIONAL: 4,
  REVANCHA: 6,
  SIEMPRE_SALE: 5,
  POZO_EXTRA: 6,
};
