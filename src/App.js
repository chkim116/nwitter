import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Main } from "./pages/Main";
import { SignIn } from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "modules/auth";
import { authService } from "fbase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) dispatch(getAuth(user));
      else dispatch(getAuth(null));
    });
  }, []);

  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div>
      <Switch>
        {isLogin ? (
          <Route exact path='/' component={Main} />
        ) : (
          <Route exact path='/' component={SignIn} />
        )}
        <Route path='/user/:id' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
