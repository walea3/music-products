import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
import Carousel from 'nuka-carousel';

import { Product, useAPI, testIdProp } from 'utils';

import { ProductItem } from './components/ProductItem';

export const getProductUrl = ({ id }: Product) => `/product-${id}`;

export function ProductListingPage() {
  const [slidesCount, setSlidesCount] = useState(2);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, data = [], error, fetchProducts] = useAPI<Product[]>(
    'products',
  );

  useEffect(() => {
    if (data.length > 0) setProducts(orderBy(data, ['feature_order', 'asc']));
  }, [data]);

  useEffect(() => {
    const handleResize = () =>
      setSlidesCount(window.innerWidth <= 1200 ? 2 : 3);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <>
          <div {...testId('carousel')}>
            <StyledCarousel slidesToShow={slidesCount}>
              {products.map((product) => (
                <ProductLink to={getProductUrl(product)} key={product.id}>
                  <ProductItem {...product} />
                </ProductLink>
              ))}
            </StyledCarousel>
          </div>

          <ProductList {...testId('list')}>
            {products.map((product) => (
              <ProductListItem key={product.id}>
                <ProductLink to={getProductUrl(product)}>
                  <ProductItem {...product} />
                </ProductLink>
              </ProductListItem>
            ))}
          </ProductList>
        </>
      )}
    </div>
  );
}

const ProductList = styled.ul`
  text-align: center;
  list-style: none;
  margin: 20px auto;
`;

const ProductListItem = styled.li`
  display: inline-block;
  margin: 10px;
  vertical-align: top;
`;

const ProductLink = styled(Link)`
  display: inline-block;
  text-align: center;
`;

const StyledCarousel = styled(Carousel)`
  padding: 50px 0;
`;
