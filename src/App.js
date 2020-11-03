import React from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Main } from "./pages/Main";
import { SignIn } from "./pages/SignIn";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route path='/main' component={Main} />
        <Route path='/user/:id' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
