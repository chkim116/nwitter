import React from "react";
import faker from "faker";

import styled from "styled-components";
import color from "style/color";

const BannerContainer = styled.div`
  margin-top: 45px;
  padding-bottom: 70px;
  max-width: 560px;
  width: 96%;

  .user__profile-banner {
    position: relative;
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  .user__profile-img {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    bottom: -50px;
    left: 5px;

    & > img {
      border: 3px solid ${color.lightenGrey};
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

export const ProfileBanner = () => {
  return (
    <BannerContainer>
      <div className='user__profile-banner'>
        <img src={faker.image.imageUrl()} alt='배너' />
        <div className='user__profile-img'>
          <img src={faker.image.imageUrl()} alt='프로필사진' />
        </div>
      </div>
    </BannerContainer>
  );
};
