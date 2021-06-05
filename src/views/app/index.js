import React, { Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import AppLayout from "../../layout/AppLayout";
const Home = React.lazy(() => import("../../components/Products/Home"));

const Cart = React.lazy(() => import("../../components/Cart/Cart"));
const Checkout = React.lazy(() => import("../../components/Checkout/Checkout"));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { match } = this.props;

    return (
      <div className={`main-bloc`}>
        <Suspense fallback={<div className="loading" />}>
          <AppLayout>
            <Switch>
              <Route
                path={`${match.url}/home`}
                render={(props) => <Home {...props} />}
              />

              <Route
                path={`${match.url}/cart`}
                render={(props) => <Cart {...props} />}
              />
              <Route
                path={`${match.url}/checkout`}
                render={(props) => <Checkout {...props} />}
              />
              <Redirect to="/app/home" />
            </Switch>
          </AppLayout>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);
