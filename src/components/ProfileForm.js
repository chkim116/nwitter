import React from "react";
import styled from "styled-components";
import color from "style/color";

const ProfileContainer = styled.div`
    max-width: 560px;
    width: 100%;
    display: flex;
`;

const ProfileDesc = styled.div`
    width: 96%;
    max-width: 560px;
    margin: 0 auto;
    padding-left: 1em;

    div:nth-child(1) {
        margin-bottom: 1em;
        font-weight: bold;
        padding-left: 2em;
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
                <ProfileDesc>
                    <div>{user.username}</div>
                </ProfileDesc>
            </ProfileContainer>
            <MyTwitter>My Tweet</MyTwitter>
        </>
    );
};
