import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ProductListingPage } from 'features/listing';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product-:productId">
          <div>Product detail</div>
        </Route>
        <Route path="/">
          <ProductListingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
