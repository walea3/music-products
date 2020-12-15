import { useParams } from 'react-router-dom';

import { ProductItem } from 'features/listing/components/ProductItem';
import { Product, useAPI } from 'utils';

type ProductParams = { productId: string };

export function ProductDetailPage() {
  const { productId } = useParams<ProductParams>();

  const [isLoading, product] = useAPI<Product>(`products/${productId}`);

  if (isLoading) return <div>Loading product ...</div>;
  if (!product)
    return <div>There was a problem finding product ({productId}).</div>;

  return (
    <ProductItem {...product}>
      <p>{product.description}</p>
    </ProductItem>
  );
}
