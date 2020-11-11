import React from "react";
import faker from "faker";

import styled from "styled-components";
import color from "style/color";

const BannerContainer = styled.div`
    margin-top: 45px;
    padding-bottom: 70px;
    max-width: 560px;
    width: 96%;
`;

const ProfileBannerImg = styled.div`
    position: relative;
    width: 100%;
    height: auto;

    img {
        width: 100%;
        height: auto;
    }
`;

const ProfileImg = styled.div`
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
`;

export const ProfileBanner = ({ user }) => {
    return (
        <BannerContainer>
            <ProfileBannerImg>
                <img src={faker.image.imageUrl()} alt="배너" />
                <ProfileImg>
                    <img src={user.profile} alt="프로필사진" />
                </ProfileImg>
            </ProfileBannerImg>
        </BannerContainer>
    );
};
