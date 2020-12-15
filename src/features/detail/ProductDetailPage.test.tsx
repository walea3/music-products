import React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';

import { getTestId, useAPI, renderPage } from 'utils';

import { ProductDetailPage } from './ProductDetailPage';

jest.mock('utils/useAPI');

const useAPIMock = useAPI as jest.Mock;

describe('<ProductDetailPage />', () => {
  const mockProduct = {
    id: 123,
    title: 'Product title',
    artist: 'Artist name',
    description: 'Product description',
    isFree: true,
    image1: 'path/to/image1.jpg',
    accentColor: '#00b6b8',
    backgroundColor: '#F2F2F2',
    textColor: '#08070b',
  };

  const mockFetchProduct = jest.fn();

  const findByTestId = (wrapper: RenderResult, childTestId?: string) =>
    wrapper.getByTestId(getTestId('Products', childTestId));

  const path = '/product-:productId';
  const route = `/product-${mockProduct.id}`;

  describe('@renders', () => {
    test('when loading', () => {
      useAPIMock.mockReturnValue([true]);

      const wrapper = renderPage(<ProductDetailPage />, path, route);

      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    test('with no product', () => {
      useAPIMock.mockReturnValue([false]);

      const wrapper = renderPage(<ProductDetailPage />, path, route);
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    test('with product', () => {
      useAPIMock.mockReturnValue([false, mockProduct]);

      const wrapper = renderPage(<ProductDetailPage />, path, route);
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });
});
