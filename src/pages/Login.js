import { Footer } from "components/layouts/footer";
import { loginSubmit } from "modules/auth";
import { signUpSubmit } from "modules/signup";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "../components/AuthForm";

export const Login = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [doSignUp, setDoSignUp] = useState(false);

    const onClick = useCallback((e) => {
        setDoSignUp((prev) => !prev);
    }, []);

    const onSign = useCallback(
        (e) => {
            const { name, value } = e.target;
            setUserData({ ...userData, [name]: value });
        },
        [userData]
    );

    const onSignInSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(loginSubmit(userData));
        },
        [userData, dispatch]
    );

    const onSignUpSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(signUpSubmit(userData));
        },
        [userData, dispatch]
    );

    return (
        <div>
            <AuthForm
                isLogin={isLogin}
                onClick={onClick}
                doSignUp={doSignUp}
                onSign={onSign}
                onSignUpSubmit={onSignUpSubmit}
                onSignInSubmit={onSignInSubmit}
            />
            <Footer />
        </div>
    );
};
