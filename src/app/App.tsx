import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ProductListingPage } from 'features/listing';
import { ProductDetailPage } from 'features/detail';
import styled from 'styled-components';

function App() {
  return (
    <Main>
      <Router>
        <Switch>
          <Route path="/product-:productId">
            <ProductDetailPage />
          </Route>
          <Route path="/">
            <ProductListingPage />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

const Main = styled.main`
  max-width: 90%;
  margin: 20px auto;
`;

export default App;
