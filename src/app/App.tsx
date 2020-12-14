import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ProductListingPage } from 'features/listing';
import { ProductDetailPage } from 'features/detail';

function App() {
  return (
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
  );
}

export default App;
