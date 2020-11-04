import { loginSubmit } from "modules/auth";
import { signUpSubmit } from "modules/signup";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "../components/AuthForm";

export const SignIn = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [doSignUp, setDoSignUp] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const onClick = useCallback(
    (e) => {
      setDoSignUp((prev) => !prev);
    },
    [doSignUp]
  );

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
    </div>
  );
};
