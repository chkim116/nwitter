import React from "react";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import color from "style/color";

const ProfileContainer = styled.div`
  max-width: 560px;
  width: 100%;
  display: flex;

  .user__profile-desc {
    width: 96%;
    max-width: 560px;
    margin: 0 auto;
    padding-left: 1em;

    div:nth-child(1) {
      margin-bottom: 1em;
      font-weight: bold;
      padding-left: 2em;
    }
  }

  .mytwit {
    padding: 1em 0;
  }

  svg {
    position: relative;
  }
`;

const MyTwitter = styled.div`
  padding: 1em 0;
  margin-bottom: 1em;
  border-bottom: 1px solid ${color.borderColor};
`;

export const ProfileForm = ({ user }) => {
  return (
    <>
      <ProfileContainer>
        <div className='user__profile-desc'>
          <div>{user.username}</div>
          <div>자기소개 하하하하</div>
        </div>
        <div>
          <BsPencil size={18} fill={color.lightenBlack} />
        </div>
      </ProfileContainer>
      <MyTwitter className='mytwit'>My Tweet</MyTwitter>
    </>
  );
};
