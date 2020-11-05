import React from "react";
import { Button } from "style/button";
import color from "style/color";
import { Input } from "style/input";
import faker from "faker/locale/ko";

import { AiOutlineLike, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import styled from "styled-components";

const TwitContainer = styled.div`
  width: 96%;
  max-width: 560px;
  margin: 0 auto;
  background: ${color.lightenBgColor};
  z-index: 330;

  .twit__form {
    margin-top: 20px;
    background: ${color.white};
    border: 1px solid ${color.borderColor};
    border-top: none;
  }
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

export const TwittForm = ({ hasTwitts, twitts, AuthTwitt }) => {
  return (
    <>
      {hasTwitts && twitts
        ? twitts.map((twitt) =>
            twitt.map((list) => (
              <TwitContainer key={list.id}>
                <div className='twit__form'>
                  <TwitUser>
                    <div>
                      <img src={faker.image.imageUrl()} alt='유저' />
                    </div>
                    {list.creator}
                  </TwitUser>
                  <TwitBoard>
                    <div className='twit__form-desc'>{list.twitt}</div>
                    <div className='twit__form-img'>
                      <img src={faker.image.imageUrl()} alt='아직없음' />
                    </div>
                    <div>
                      <div className='twit__form-btn'>
                        <div className='comment-btn'>
                          <FaRegCommentDots
                            fill={color.lightenBlack}
                            size={24}
                          />
                        </div>
                        <div className='like-btn'>
                          <AiOutlineLike fill={color.lightenBlack} size={24} />
                        </div>
                        <div className='view-btn'>
                          <AiOutlineEllipsis
                            fill={color.lightenBlack}
                            size={24}
                          />
                          <div className='twit__form-edit'>
                            <Button
                              type='button'
                              bgColor={color.mainBlue}
                              color={color.white}>
                              수정
                            </Button>
                            <Button
                              type='button'
                              bgColor={color.red}
                              color={color.white}>
                              삭제
                            </Button>
                          </div>
                        </div>
                      </div>
                      {/* 코멘트 누르면 보이게 */}
                      <TwitCommnet>
                        <div className='twit__comment-desc'>
                          <TwitUser>
                            <div>
                              <img src={faker.image.imageUrl()} alt='유저' />
                            </div>
                            {list.creator}
                          </TwitUser>
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
                      </TwitCommnet>
                    </div>
                  </TwitBoard>
                </div>
              </TwitContainer>
            ))
          )
        : AuthTwitt.map((twitt) =>
            twitt.map((list) => (
              <TwitContainer key={list.id}>
                <div className='twit__form'>
                  <TwitUser>
                    <div>
                      <img src={faker.image.imageUrl()} alt='유저' />
                    </div>
                    {list.creator}
                  </TwitUser>
                  <TwitBoard>
                    <div className='twit__form-desc'>{list.twitt}</div>
                    <div className='twit__form-img'>
                      <img src={faker.image.imageUrl()} alt='아직없음' />
                    </div>
                    <div>
                      <div className='twit__form-btn'>
                        <div className='comment-btn'>
                          <FaRegCommentDots
                            fill={color.lightenBlack}
                            size={24}
                          />
                        </div>
                        <div className='like-btn'>
                          <AiOutlineLike fill={color.lightenBlack} size={24} />
                        </div>
                        <div className='view-btn'>
                          <AiOutlineEllipsis
                            fill={color.lightenBlack}
                            size={24}
                          />
                          <div className='twit__form-edit'>
                            <Button
                              type='button'
                              bgColor={color.mainBlue}
                              color={color.white}>
                              수정
                            </Button>
                            <Button
                              type='button'
                              bgColor={color.red}
                              color={color.white}>
                              삭제
                            </Button>
                          </div>
                        </div>
                      </div>
                      {/* 코멘트 누르면 보이게 */}
                      <TwitCommnet>
                        <div className='twit__comment-desc'>
                          <TwitUser>
                            <div>
                              <img src={faker.image.imageUrl()} alt='유저' />
                            </div>
                            {list.creator}
                          </TwitUser>
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
                      </TwitCommnet>
                    </div>
                  </TwitBoard>
                </div>
              </TwitContainer>
            ))
          )}
    </>
  );
};
