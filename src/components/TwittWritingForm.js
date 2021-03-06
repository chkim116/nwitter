import React from "react";
import { Button } from "style/button";
import color from "style/color";
import { BiImageAlt } from "react-icons/bi";

import styled from "styled-components";
import { useSelector } from "react-redux";

const TwitContainer = styled.div`
    width: 96%;
    max-width: 560px;
    margin-top: 50px;
    z-index: 330;
    .twit__box {
        display: flex;
        padding: 1em;
        border-radius: 12px;
        box-shadow: 0.4px 0.4px 2.4px 1px ${color.borderColor};

        .twit__box-user {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;

            & > img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
`;

const TwitWritingBlock = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;

    & > textarea {
        all: unset;
        font-size: 14px;
        padding: 1em;
        border: none;
        height: 40px;
        resize: none;
        overflow: scroll;
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
        }

        &:focus {
            background: ${color.focusBg};
        }
    }

    .twit__box-submit {
        display: flex;
        font-size: 12px;
        margin-top: 6px;
        justify-content: space-between;

        svg {
            cursor: pointer;
        }
    }

    img {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        border-radius: 12px;
        box-shadow: 0.2px 0.2px 3px 1.5px ${color.borderColor};
    }
`;

export const TwittWritingForm = ({
    twitt,
    onTwittText,
    onTwittSubmit,
    imgInput,
    onInputClick,
    onImage,
    readImg,
    onImageDelete,
}) => {
    const user = useSelector((state) => state.auth.user);
    return (
        <TwitContainer>
            <div className="twit__box">
                <div className="twit__box-user">
                    <img src={user.profile} alt="유저" />
                </div>

                <TwitWritingBlock onSubmit={onTwittSubmit}>
                    <textarea
                        value={twitt}
                        onChange={onTwittText}
                        type="text"
                        placeholder="트윗 입력"
                    />
                    {readImg && (
                        <>
                            <Button type="button" onClick={onImageDelete}>
                                X
                            </Button>
                            <img src={readImg} alt="미리보기 사진" />
                        </>
                    )}
                    <div>
                        <div className="twit__box-submit">
                            <input
                                type="file"
                                accept="image/* "
                                onChange={onImage}
                                hidden
                                ref={imgInput}
                            />
                            <BiImageAlt
                                fill={color.mainBlue}
                                onClick={onInputClick}
                                size={24}
                            />
                            <Button
                                bgColor={color.mainBlue}
                                color={color.white}
                                type="submit">
                                Nweet!
                            </Button>
                        </div>
                    </div>
                </TwitWritingBlock>
            </div>
        </TwitContainer>
    );
};
