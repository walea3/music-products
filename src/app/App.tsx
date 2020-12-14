import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product-:productId">
          <div>Product detail</div>
        </Route>
        <Route path="/">
          <div>Products listing</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
