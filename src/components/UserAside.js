import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import color from "style/color";
import { Button } from "style/button";

import { GoHome } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import styled from "styled-components";
import { logOut } from "modules/auth";
import { useDispatch, useSelector } from "react-redux";

const UserBlock = styled.div`
    position: sticky;
    top: 35px;
    left: 0px;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;

    @media all and (max-width: 800px) {
        position: absolute;
        top: -5px;
    }
`;

const Logo = styled.div`
    align-self: flex-start;
    cursor: pointer;
    margin: 1em;
    z-index: 33;

    @media all and (max-width: 800px) {
        display: none;
    }
`;

const MediaLogo = styled.div`
    cursor: pointer;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 500;
    @media all and (min-width: 800px) {
        display: none;
    }
`;

const AsideBlock = styled.div`
    width: 100%;
    border-right: 1px solid ${color.borderColor};
    margin-top: 30px;
    z-index: 400;
    @media all and (max-width: 800px) {
        position: absolute;
        padding-top: 100px;
        background: ${color.white};
        top: -31px;
        left: ${(props) => (props.showAside ? "0px" : "-999px")};
        transition: all 300ms;
        height: 100vh;
        width: 280px;
        overflow: hidden;
    }

    ul {
        li {
            position: relative;
            margin: 2em 0;
            left: 45px;

            a {
                font-weight: bold;
                color: ${color.black};
                .link-icon {
                    position: absolute;
                    left: -30px;
                    top: -2px;
                }
            }
        }

        button {
            position: relative;
            left: 10px;
            font-size: 12px;
        }
    }
`;

export const UserAside = () => {
    const dispatch = useDispatch();
    const { id, username } = useSelector((state) => state.auth.user);
    const history = useHistory();

    const onMove = useCallback(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    const onLogout = useCallback(() => {
        dispatch(logOut());
        history.push("/");
    }, [dispatch, history]);

    const [showAside, setShowAside] = useState(false);

    const onAside = useCallback(() => {
        setShowAside((prev) => !prev);
    }, []);

    return (
        <UserBlock>
            <Logo>
                <FaTwitter fill={color.mainBlue} size={30} />
            </Logo>
            <MediaLogo onClick={onAside}>
                <FiMenu size={30} />
            </MediaLogo>
            <AsideBlock showAside={showAside}>
                <ul>
                    <li onClick={onMove}>
                        <Link to="/">
                            <GoHome size={24} className="link-icon" />
                            Home
                        </Link>
                    </li>
                    <li onClick={onMove}>
                        <Link to={`/user/${id}`}>
                            <ImProfile size={24} className="link-icon" />
                            {username}의 Profile
                        </Link>
                    </li>

                    <Button
                        bgColor={color.mainBlue}
                        color={color.white}
                        type="button"
                        onClick={onLogout}>
                        로그아웃
                    </Button>
                </ul>
            </AsideBlock>
        </UserBlock>
    );
};
