import React from 'react';

import { renderWithRouter } from 'utils';

import App from './App';

describe('<App />', () => {
  describe('@renders', () => {
    test('initial route as product listings page', () => {
      const wrapper = renderWithRouter(<App />);
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    test('product route with product id', () => {
      const wrapper = renderWithRouter(<App />, { route: '/product-1' });
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });
});
