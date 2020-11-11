import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "modules/auth";
import { authService, dbService } from "fbase";
import { getTwitt } from "modules/get";

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
    }, []);

    useEffect(() => {
        const getTwit = async () => {
            try {
                await dbService
                    .collection("nweets")
                    .orderBy("createAt", "desc")
                    .limit(5)
                    .onSnapshot((snapshot) => {
                        const array = snapshot.docs.map((doc) => [
                            { ...doc.data(), id: doc.id },
                        ]);
                        dispatch(getTwitt(array));
                    });
            } catch (err) {
                console.log(err);
            }
        };
        if (isLogin) {
            getTwit();
        }
    }, [isLogin]);

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
