import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views/app")
);
const View = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);

const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);

class App extends Component {
  render() {
    return (
      <div className="h-100">
        <React.Fragment>
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <Route path="/app" component={ViewMain} />
                <Route path="/" exact component={View} />
                <Route path="/error" exact component={ViewError} />
                <Redirect to="/app" />
              </Switch>
            </Router>
          </Suspense>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
