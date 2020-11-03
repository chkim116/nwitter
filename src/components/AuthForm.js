import React from "react";

export const AuthForm = ({
  onClick,
  doSignUp,
  onSign,
  onSignInSubmit,
  onSignUpSubmit,
}) => {
  return (
    <div>
      <div>로고</div>
      {doSignUp ? <h2>가입</h2> : <h2>로그인</h2>}
      <form
        onChange={onSign}
        onSubmit={doSignUp ? onSignUpSubmit : onSignInSubmit}>
        <input type='email' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
        <button type='submit'>확인</button>
      </form>
      {doSignUp ? (
        <button type='button' onClick={onClick}>
          SignUp
        </button>
      ) : (
        <button type='button' onClick={onClick}>
          SignIn
        </button>
      )}
    </div>
  );
};
