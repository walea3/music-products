import { Product, useAPI } from 'utils';

export function ProductListingPage() {
  const [isLoading, products = [], error, fetchProducts] = useAPI<Product[]>(
    'products',
  );

  return (
    <div>
      <h1>Products</h1>

      {error && (
        <>
          There was problem getting you products.{' '}
          <button onClick={fetchProducts}>Try again.</button>
        </>
      )}

      {isLoading && <div>Loading products ...</div>}

      {products.length < 1 ? (
        <div>No products, yet.</div>
      ) : (
        <ul>
          {products.map(({ artist, ...product }) => (
            <article>
              <header>
                <h2>{product.title}</h2>
                <div>{product.description}</div>
                <div>
                  {product.isFree ? 'Free' : <>&pound;{product.price}</>}
                </div>
                <img src={product.image1} alt={artist} />
                <img src={product.image2} alt={artist} />
              </header>
            </article>
          ))}
        </ul>
      )}
    </div>
  );
}
