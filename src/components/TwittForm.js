import React from "react";
import { useSelector } from "react-redux";
import { Button } from "style/button";
import color from "style/color";
import { Input } from "style/input";
import faker from "faker/locale/ko";

import { AiOutlineLike, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import styled from "styled-components";

const TwitFormBlock = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${color.lightenBgColor};
  .twit__form {
    margin-top: 20px;
    background: ${color.white};
    border: 1px solid ${color.borderColor};
    border-top: none;
    .twit__form-user {
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
    }
  }

  .twit__form-img {
    max-width: 560px;
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

  .twit__form-desc {
    max-width: 560px;
    padding: 1em;
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
      &:hover {
        color: ${color.lightenBlack};
      }
    }

    .view-btn {
      position: relative;
      cursor: pointer;
      padding: 0.4em;

      .twit__form-edit {
        top: 0;
        position: absolute;
        display: flex;
        display: none;
      }
    }
  }

  .twit__comment {
    padding: 1em;
    font-size: 14px;
    border-bottom: 1px solid ${color.borderColor};

    .twit__comment-desc {
      display: flex;
      align-items: center;
      margin-bottom: 0.6em;
    }

    & > form {
      display: flex;
      width: 100%;
      & > input {
        flex: 2;
        padding-left: 15px;
        border: none;
        &:focus {
          background: ${color.focusBg};
        }
      }
      & > button {
      }
    }
  }
`;

export const TwittForm = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <TwitFormBlock>
      <div className='twit__form'>
        <div className='twit__form-user'>
          <div>
            <img src={faker.image.imageUrl()} alt='유저' />
          </div>
          {user.username}
        </div>

        <div>
          <div className='twit__form-desc'>{faker.lorem.sentences()}</div>
          <div className='twit__form-img'>
            <img src={faker.image.imageUrl()} alt='아직없음' />
          </div>
          <div>
            <div className='twit__form-btn'>
              <div className='comment-btn'>
                <FaRegCommentDots fill={color.lightenBlack} size={24} />
              </div>
              <div className='like-btn'>
                <AiOutlineLike fill={color.lightenBlack} size={24} />
              </div>
              <div className='view-btn'>
                <AiOutlineEllipsis fill={color.lightenBlack} size={24} />
                <div className='twit__form-edit'>
                  <Button
                    type='button'
                    bgColor={color.mainBlue}
                    color={color.white}>
                    수정
                  </Button>
                  <Button type='button' bgColor={color.red} color={color.white}>
                    삭제
                  </Button>
                </div>
              </div>
            </div>

            {/* 코멘트 누르면 보이게 */}
            <div className='twit__comment'>
              <div className='twit__comment-desc'>
                <div className='twit__form-user'>
                  <div>
                    <img src={faker.image.imageUrl()} alt='유저' />
                  </div>
                  {user.username}
                </div>
                <div>{faker.lorem.sentences()}</div>
              </div>{" "}
              <div className='twit__comment-desc'>
                <div className='twit__form-user'>
                  <div>
                    <img src={faker.image.imageUrl()} alt='유저' />
                  </div>
                  {user.username}
                </div>
                <div>{faker.lorem.sentences()}</div>
              </div>{" "}
              <div className='twit__comment-desc'>
                <div className='twit__form-user'>
                  <div>
                    <img src={faker.image.imageUrl()} alt='유저' />
                  </div>
                  {user.username}
                </div>
                <div>{faker.lorem.sentences()}</div>
              </div>
              <form>
                <Input type='text' placeholder='댓글입력' />
                <Button
                  type='submit'
                  bgColor={color.mainBlue}
                  color={color.white}>
                  Comment
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </TwitFormBlock>
  );
};
