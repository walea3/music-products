import { useParams } from 'react-router-dom';

import { Product, useAPI } from 'utils';

type ProductParams = { productId: string };

export function ProductDetailPage() {
  const { productId } = useParams<ProductParams>();

  const [isLoading, product] = useAPI<Product>(`products/${productId}`);

  return isLoading ? (
    <div>Loading product ...</div>
  ) : (
    <div>
      {!product ? (
        <div>There was a problem finding product ({productId}).</div>
      ) : (
        <>
          <h1>{product.title}</h1>
          <img src={product.image1} alt={product.artist} />
          <div>{product.description}</div>
          <div>{product.isFree ? 'Free' : <>&pound;{product.price}</>}</div>
        </>
      )}
    </div>
  );
}
