import React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';

import { getTestId, useAPI, renderWithRouter } from 'utils';

import { ProductListingPage } from './ProductListingPage';

jest.mock('utils/useAPI');

const useAPIMock = useAPI as jest.Mock;

describe('<ProductListingPage />', () => {
  const mockProduct = {
    id: 123,
    title: 'Product title',
    artist: 'Artist name',
    isFree: true,
    image1: 'path/to/image1.jpg',
    accentColor: '#00b6b8',
    backgroundColor: '#F2F2F2',
    textColor: '#08070b',
  };

  const mockFetchProduct = jest.fn();

  const findByTestId = (wrapper: RenderResult, childTestId?: string) =>
    wrapper.getByTestId(getTestId('Products', childTestId));

  describe('@renders', () => {
    test('when loading', () => {
      useAPIMock.mockReturnValue([true, undefined, undefined, mockFetchProduct]);

      const wrapper = renderWithRouter(<ProductListingPage />);
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    test('with no products', () => {
      useAPIMock.mockReturnValue([false, [], undefined, mockFetchProduct]);

      const wrapper = renderWithRouter(<ProductListingPage />);
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    test('with a single product', () => {
      useAPIMock.mockReturnValue([
        false,
        [mockProduct],
        undefined,
        mockFetchProduct,
      ]);

      const wrapper = renderWithRouter(<ProductListingPage />);
      expect(findByTestId(wrapper, 'list')).toMatchSnapshot();
    });

    test('with multiple ordered products', () => {
      useAPIMock.mockReturnValue([
        false,
        [
          { ...mockProduct, id: 999, title: 'Product 2', feature_order: 2 },
          { ...mockProduct, id: 888, title: 'Product 3', feature_order: 3 },
          { ...mockProduct, id: 777, title: 'Product 1', feature_order: 1 },
        ],
        undefined,
        mockFetchProduct,
      ]);

      const wrapper = renderWithRouter(<ProductListingPage />);
      expect(findByTestId(wrapper, 'list')).toMatchSnapshot();
      expect(findByTestId(wrapper, 'carousel')).toMatchSnapshot('carousel');
    });

    test('with error', () => {
      useAPIMock.mockReturnValue([false, [], true, mockFetchProduct]);

      const wrapper = renderWithRouter(<ProductListingPage />);

      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  describe('@actions', () => {
    test('clicking try again button calls fetch products', () => {
      useAPIMock.mockReturnValue([false, [], true, mockFetchProduct]);

      const wrapper = renderWithRouter(<ProductListingPage />);

      expect(mockFetchProduct).not.toHaveBeenCalled();

      fireEvent.click(findByTestId(wrapper, 'tryAgain'));
      expect(mockFetchProduct).toHaveBeenCalledTimes(1);
    });
  });
});
