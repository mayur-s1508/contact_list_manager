import React from "react";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const PageNotFound = () => {
  return <div>Page not found</div>;
};
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <PrivateRoute />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
