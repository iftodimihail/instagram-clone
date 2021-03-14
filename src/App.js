import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "antd/dist/antd.css";

import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";

import AppLayout from "components/common/AppLayout";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
