import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { getTestId } from 'utils';

import { ProductItem } from './ProductItem';

describe('<ProductItem />', () => {
  const requiredProps = {
    id: 123,
    title: 'Product title',
    artist: 'Artist name',
    description: 'Description',
    isFree: true,
    image1: 'path/to/image1.jpg',
    image2: 'path/to/image2.jpg',
    accentColor: '#00b6b8',
    backgroundColor: '#F2F2F2',
    textColor: '#08070b',
    feature_order: '0',
  };

  const findByTestId = (
    wrapper: RenderResult,
    { id }: typeof requiredProps,
    childTestId?: string,
  ) => wrapper.getByTestId(getTestId('Product', id, childTestId));

  describe('@renders', () => {
    test('a free product as default', () => {
      const wrapper = render(<ProductItem {...requiredProps} />);

      expect(findByTestId(wrapper, requiredProps)).toMatchSnapshot();
    });

    test('a paid product without a price', () => {
      const wrapper = render(<ProductItem {...requiredProps} isFree={false} />);

      expect(findByTestId(wrapper, requiredProps, 'price')).toMatchSnapshot();
    });

    test('a paid product with a price', () => {
      const wrapper = render(
        <ProductItem {...requiredProps} isFree={false} price="9.99" />,
      );

      expect(findByTestId(wrapper, requiredProps, 'price')).toMatchSnapshot();
    });

    test('without background color', () => {
      const wrapper = render(
        <ProductItem {...requiredProps} isFree={false} price="9.99" />,
      );

      expect(findByTestId(wrapper, requiredProps, 'price')).toMatchSnapshot();
    });
  });
});
