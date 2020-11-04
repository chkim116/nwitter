import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import color from "style/color";
import { Button } from "style/button";

import { GoHome } from "react-icons/go";
import { CgList } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import styled from "styled-components";

const UserBlock = styled.div`
  position: relative;
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

  .user__aside {
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

    & > ul {
      & > li {
        position: relative;
        margin: 2em 0;
        left: 45px;

        & > a {
          font-weight: bold;
          color: ${color.black};
          .link-icon {
            position: absolute;
            left: -30px;
            top: -2px;
          }
        }
      }

      & > button {
        position: relative;
        left: 10px;
        font-size: 12px;
      }
    }
  }
`;

export const UserAside = ({ user, onLogout }) => {
  return (
    <UserBlock>
      <div className='twit__logo'>
        <FaTwitter fill={color.mainBlue} size={30} />
      </div>
      <div className='user__aside'>
        <ul>
          <li>
            <Link to='/'>
              <GoHome size={24} className='link-icon' />
              Home
            </Link>
          </li>
          <li>
            <Link to='/user/3'>
              <ImProfile size={24} className='link-icon' />
              Profile
            </Link>
          </li>
          <li>
            <Link to='/user/3/likes'>
              <CgList size={24} className='link-icon' />
              Like Lists
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
      </div>
    </UserBlock>
  );
};
