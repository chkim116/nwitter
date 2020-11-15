import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "modules/auth";
import { authService } from "fbase";
import { useGetTwitt } from "hook";

function App() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                dispatch(getAuth(user));
            } else {
                return;
            }
        });
    }, [dispatch]);

    useGetTwitt(isLogin);

    return (
        <div>
            <Switch>
                {isLogin ? (
                    <>
                        <Route exact path="/" component={Main} />
                        <Route path="/user/:id" component={Profile} />
                    </>
                ) : (
                    <>
                        <Route exact path="/" component={Login} />
                    </>
                )}
            </Switch>
        </div>
    );
}

export default App;
