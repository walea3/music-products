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

export let naiveProductCache: { [id: number]: Product } = {};

export const hasMismatchedData = ({ id }: Product) => mismatchedDataMap[id];

export const parseProducts = (products: Product[]) => {
  naiveProductCache = products.reduce(
    (cache, product) =>
      hasMismatchedData(product) ? { ...cache, [product.id]: product } : cache,
    naiveProductCache,
  );

  return Object.keys(naiveProductCache).length
    ? products.map(fixMismatch)
    : products;
};

export const fixMismatch = (product: Product) => {
  const mismatches = mismatchedDataMap[product.id];

  return mismatches
    ? mismatches.reduce((fixedProduct, [mismatchId, ...fields]) => {
        const matchedProduct = naiveProductCache[mismatchId];
        return fields.reduce(
          (acc, field) => ({ ...acc, [field]: matchedProduct[field] }),
          fixedProduct,
        );
      }, product)
    : product;
};

const mismatchedDataMap: {
  [id: number]: [mismatchId: number, ...fields: (keyof Product)[]][];
} = {
  111: [[114, 'image1', 'image2']],
  114: [[111, 'image1', 'image2']],
};
