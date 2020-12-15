import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';

import { Product, useAPI, testIdProp } from 'utils';

import { ProductItem } from './components/ProductItem';

export const getProductUrl = ({ id }: Product) => `/product-${id}`;

export function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, data = [], error, fetchProducts] = useAPI<Product[]>(
    'products',
  );

  useEffect(() => {
    if (data.length > 0) setProducts(orderBy(data, ['feature_order', 'asc']));
  }, [data]);

  const testId = testIdProp('Products');

  return (
    <div>
      <h1>Products</h1>

      {error && (
        <>
          There was problem getting you products.{' '}
          <button onClick={fetchProducts} {...testId('tryAgain')}>
            Try again.
          </button>
        </>
      )}

      {isLoading && <div>Loading products ...</div>}

      {products.length < 1 ? (
        <div>No products, yet.</div>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ProductListItem key={product.id}>
              <Link to={getProductUrl(product)}>
                <ProductItem {...product} />
              </Link>
            </ProductListItem>
          ))}
        </ProductList>
      )}
    </div>
  );
}

const ProductList = styled.ul`
  text-align: center;
  list-style: none;
  margin: 0 auto;
`;

const ProductListItem = styled.li`
  display: inline-block;
  margin: 10px;
  vertical-align: top;
`;
