import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Route, RouteProps, BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

export const renderPage = (
  page: RouteProps['children'],
  path: RouteProps['path'],
  route: string,
) => renderWithRouter(<Route path={path}>{page}</Route>, { route });

// based on react-testing library default
const TEST_ID_ATTR = 'data-testid';
const TEST_ID_DELIMITER = '-';

// @TODO if desired remove test id in prod
export const testIdProp = (baseTestId: string) => (id?: string) => ({
  [TEST_ID_ATTR]: `${baseTestId}${id ? `${TEST_ID_DELIMITER}${id}` : ''}`,
});

export const getTestId = (...args: any[]) =>
  args.filter(Boolean).join(TEST_ID_DELIMITER);
