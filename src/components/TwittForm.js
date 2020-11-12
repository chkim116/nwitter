import React from "react";
import { Button } from "style/button";
import color from "style/color";
import { Input } from "style/input";

import { AiOutlineLike, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import styled from "styled-components";
import { useSelector } from "react-redux";

const TwitContainer = styled.div`
    width: 96%;
    max-width: 560px;
    margin: 0 auto;
    background: ${color.lightenBgColor};
    z-index: 330;
`;

const TwitForm = styled.div`
    margin-top: 20px;
    background: ${color.white};
    border: 1px solid ${color.borderColor};
    border-top: none;
`;

const TwitUser = styled.div`
    padding: 0.8em;
    display: flex;
    align-items: center;

    & div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;

        & img {
            width: 100%;
            border-radius: 50%;
            height: 100%;
        }
    }
`;

const TwitBoard = styled.div`
    .twit__form-desc {
        max-width: 560px;
        padding: 1em;
    }

    .twit__form-img {
        max-width: 350px;
        width: 95%;
        height: auto;
        margin: 0 auto;
        margin-bottom: 1em;
        border-radius: 33px;
        vertical-align: middle;
        & > img {
            border-radius: 33px;
            width: 100%;
            height: 100%;
        }
    }

    .twit__form-btn {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid ${color.borderColor};

        .like-btn,
        .comment-btn {
            text-align: center;
            padding: 0.4em;
            cursor: pointer;
            position: relative;
            &:hover {
                color: ${color.lightenBlack};
            }
            span {
                position: absolute;
                top: 12px;
                right: -3px;
                font-size: 12px;
            }
        }

        .view-btn {
            position: relative;
            cursor: pointer;
            padding: 0.4em;

            .twit__form-edit {
                top: -30px;
                left: -15px;
                position: absolute;
                display: none;
                width: 80px;
                display:block button {
                    padding: 0.3em 1em;
                }
            }

            &:hover .twit__form-edit {
                display: flex;
            }
        }

        .like-length {
            position: relative;
            top: -4px;
            font-size: 14px;
            color: ${color.black};
        }
    }
`;

const TwitCommnet = styled.div`
    padding: 1em;
    font-size: 14px;
    border-bottom: 1px solid ${color.borderColor};

    .twit__comment-desc {
        display: flex;
        align-items: center;
        margin-bottom: 0.6em;
    }

    form {
        display: flex;
        width: 100%;

        input {
            flex: 2;
            padding-left: 15px;
            border: none;
            &:focus {
                background: ${color.focusBg};
            }
        }
    }
`;

export const TwittForm = ({
    hasTwitts,
    twitts,
    onComment,
    onCommentSubmit,
    onLike,
    onDelete,
}) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            {hasTwitts && twitts ? (
                twitts.map((twitt) =>
                    twitt.map((list) => (
                        <TwitContainer key={list.id}>
                            <TwitForm>
                                <TwitUser>
                                    <div>
                                        <img src={list.profile} alt="유저" />
                                    </div>
                                    {list.creator}
                                </TwitUser>
                                <TwitBoard>
                                    <div className="twit__form-desc">
                                        {list.twitt}
                                    </div>
                                    <div className="twit__form-img">
                                        {list.imgUrl && (
                                            <img
                                                src={list.imgUrl}
                                                alt="트윗이미지"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <div className="twit__form-btn">
                                            <div className="comment-btn">
                                                <FaRegCommentDots
                                                    fill={color.lightenBlack}
                                                    size={24}
                                                />
                                                {list.comments && (
                                                    <span>
                                                        {list.comments.length}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="like-btn">
                                                <AiOutlineLike
                                                    fill={
                                                        list.likes &&
                                                        list.likes.find(
                                                            (id) =>
                                                                id === user.id
                                                        )
                                                            ? color.mainBlue
                                                            : color.lightenBlack
                                                    }
                                                    size={24}
                                                    data-id={list.id}
                                                    onClick={onLike}
                                                />
                                                <span className="like-length">
                                                    {list.likes &&
                                                        list.likes.length}
                                                </span>
                                            </div>
                                            <div className="view-btn">
                                                <AiOutlineEllipsis
                                                    fill={color.lightenBlack}
                                                    size={24}
                                                />
                                                <div className="twit__form-edit">
                                                    {user.id ===
                                                        list.creatorId && (
                                                        <Button
                                                            data-id={list.id}
                                                            type="button"
                                                            bgColor={color.red}
                                                            color={color.white}
                                                            onClick={onDelete}>
                                                            삭제
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <TwitCommnet>
                                            {list.comments &&
                                                list.comments.map(
                                                    (cm, index) => (
                                                        <div
                                                            key={index}
                                                            className="twit__comment-desc">
                                                            <TwitUser>
                                                                <div>
                                                                    <img
                                                                        src={
                                                                            cm.profile
                                                                        }
                                                                        alt="유저"
                                                                    />
                                                                </div>
                                                                {cm.creator}
                                                            </TwitUser>
                                                            <div>
                                                                {cm.comment}
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                            <form
                                                data-id={list.id}
                                                onSubmit={onCommentSubmit}>
                                                <Input
                                                    type="text"
                                                    placeholder="댓글입력"
                                                    onChange={onComment}
                                                />
                                                <Button
                                                    type="submit"
                                                    bgColor={color.mainBlue}
                                                    color={color.white}>
                                                    Comment
                                                </Button>
                                            </form>
                                        </TwitCommnet>
                                    </div>
                                </TwitBoard>
                            </TwitForm>
                        </TwitContainer>
                    ))
                )
            ) : (
                <div>로딩</div>
            )}
        </>
    );
};
