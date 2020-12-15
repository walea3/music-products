import { ReactNode } from 'react';
import styled from 'styled-components';

import { BASE_PRICE, DEFAULT_BG_COLOR, Product, testIdProp } from 'utils';

export function ProductItem({
  id,
  title,
  children,
  artist,
  price,
  image1,
  textColor,
  accentColor,
  backgroundColor = DEFAULT_BG_COLOR,
  isFree,
}: Product & { children?: ReactNode }) {
  const testId = testIdProp(`Product-${id}`);

  return (
    <ProductContainer
      $color={textColor}
      $borderColor={accentColor}
      {...testId()}
    >
      <ProductImage src={image1} alt={artist} {...testId('image')} />
      <ProductInfo $color={backgroundColor}>
        <ProductTitle {...testId('title')}>{title}</ProductTitle>
        {children}
        <ProductPrice $color={accentColor} {...testId('price')}>
          {isFree ? 'Free' : <>&pound;{price || BASE_PRICE}</>}
        </ProductPrice>
      </ProductInfo>
    </ProductContainer>
  );
}

const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  transition: transform 0.5s ease-in-out;
`;

const ProductContainer = styled.article<{
  $color: Product['textColor'];
  $borderColor: Product['accentColor'];
}>`
  position: relative;
  display: inline-block;
  flex-direction: column;
  border-top: 5px solid;
  border-color: ${(props) => props.$borderColor};
  overflow: hidden;
  width: 90%;
  max-width: 490px;
  color: ${(props) => props.$color};

  &:hover ${ProductImage} {
    transform: scale(1.2);
  }
`;

const ProductInfo = styled.div<{
  $color: Product['backgroundColor'];
}>`
  position: relative;
  z-index: 1;
  padding: 20px;
  background-color: ${(props) => props.$color};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ProductTitle = styled.h2`
  margin-top: 0;
`;

const ProductPrice = styled.div<{
  $color: Product['accentColor'];
}>`
  display: inline-block;
  right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.$color};
  font-weight: bold;
  font-size: 1.2rem;
`;
