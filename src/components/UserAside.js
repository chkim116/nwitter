import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import color from "style/color";
import { Button } from "style/button";

import { GoHome } from "react-icons/go";
import { CgList } from "react-icons/cg";
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

  .twit__logo {
    align-self: flex-start;
    cursor: pointer;
    margin: 1em;
    z-index: 33;
  }
`;

const AsideBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${color.borderColor};
  margin-top: 30px;

  @media all and (max-width: 800px) {
    position: absolute;
    padding-top: 100px;
    background: ${color.white};
    top: -31px;
    left: -999px;
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

  const onMove = useCallback((e) => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  const onLogout = useCallback(
    (e) => {
      dispatch(logOut());
      history.push("/");
    },
    [dispatch]
  );

  return (
    <UserBlock>
      <div className='twit__logo'>
        <FaTwitter fill={color.mainBlue} size={30} />
      </div>
      <AsideBlock>
        <ul>
          <li onClick={onMove}>
            <Link to='/'>
              <GoHome size={24} className='link-icon' />
              Home
            </Link>
          </li>
          <li onClick={onMove}>
            <Link to={`/user/${id}`}>
              <ImProfile size={24} className='link-icon' />
              {username}의 Profile
            </Link>
          </li>

          <Button
            bgColor={color.mainBlue}
            color={color.white}
            type='button'
            onClick={onLogout}>
            로그아웃
          </Button>
        </ul>
      </AsideBlock>
    </UserBlock>
  );
};
