export type Product = {
  id: number;
  title: string;
  description: string;
  artist: string;
  isFree: boolean;
  image1: string;
  image2: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  feature_order: string;
  price?: string;
};

export const BASE_PRICE = 12.99;
export const DEFAULT_BG_COLOR = '#424242';
