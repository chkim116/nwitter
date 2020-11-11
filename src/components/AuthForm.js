import React from "react";
import styled from "styled-components";
import { Input } from "style/input";
import { Button } from "../style/button";
import color from "style/color";
import { FaTwitter } from "react-icons/fa";

const AuthContainer = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: fixed;
    top: 20%;

    .auth__logo {
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        text-align: center;
    }
`;

const AuthFormBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    margin: 0 auto;

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > input {
            padding: 0.5em;
            width: 200px;
            margin: 0.5em 0;
            &:focus {
                background-color: ${color.focusBg};
            }
        }

        & > button {
            margin: 1em 0;
            width: 100px;
        }
    }

    .auth-btn {
        width: 100px;
        border: 1px solid ${color.mainBlue};
    }
`;

export const AuthForm = ({
    onClick,
    doSignUp,
    onSign,
    onSignInSubmit,
    onSignUpSubmit,
    signUpError,
    signInError,
}) => {
    return (
        <AuthContainer>
            <div className="auth__logo">
                <FaTwitter fill={color.mainBlue} size={36} />
            </div>
            <AuthFormBlock>
                {doSignUp ? <h2>가입</h2> : <h2>로그인</h2>}
                {signInError ? `${signInError}` : <> </>}
                {signUpError ? `${signUpError}` : <> </>}
                <form
                    onChange={onSign}
                    onSubmit={doSignUp ? onSignUpSubmit : onSignInSubmit}>
                    <Input
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="email"
                    />
                    <Input
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="password"
                    />
                    <Button
                        bgColor={color.mainBlue}
                        color={color.white}
                        type="submit">
                        확인
                    </Button>
                </form>
                {doSignUp ? (
                    <Button
                        bgColor={color.white}
                        color={color.mainBlue}
                        className="auth-btn"
                        type="button"
                        onClick={onClick}>
                        SignUp
                    </Button>
                ) : (
                    <Button
                        color={color.mainBlue}
                        className="auth-btn"
                        type="button"
                        onClick={onClick}>
                        SignIn
                    </Button>
                )}
            </AuthFormBlock>
        </AuthContainer>
    );
};
