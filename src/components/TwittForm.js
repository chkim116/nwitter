import React from "react";
import { useSelector } from "react-redux";
import { Button } from "style/button";
import color from "style/color";
import { Input } from "style/input";

import { AiOutlineLike, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import styled from "styled-components";

const TwitFormBlock = styled.div`
  width: 100%;
  max-width: 560px;

  .twit__form {
    background: ${color.white};
    margin-top: 25px;
    border-top: none;
    .twit__form-user {
      padding: 0.8em;
      display: flex;

      & div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;

        & img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .twit__form-img {
    max-width: 560px;
    width: 95%;
    height: 300px;
    margin: 0 auto;
    margin-bottom: 1em;
    border-radius: 33px;
    border: 1px solid ${color.borderColor};
    vertical-align: middle;
    & > img {
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
        transition: transform 500ms;
        transform: scale(1.2);
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
            <img src={user.profile} alt='유저' />
          </div>
          {user.username}
        </div>

        <div>
          <div className='twit__form-desc'>
            트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗
            내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗
            내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗
            내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗
            내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용트윗 내용
          </div>
          <div className='twit__form-img'>
            <img src='' alt='아직없음' />
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
                    <img src={user.profile} alt='유저' />
                  </div>
                  {user.username}
                </div>
                <div>댓글 달린거</div>
              </div>
              <form>
                <Input type='text' placeholder='댓글입력' />
                <Button
                  type='submit'
                  bgColor={color.mainBlue}
                  color={color.white}>
                  등록
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </TwitFormBlock>
  );
};
