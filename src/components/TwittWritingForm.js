import React from "react";
import { useSelector } from "react-redux";
import { Button } from "style/button";
import color from "style/color";
import faker from "faker/locale/ko";
import { BiImageAlt } from "react-icons/bi";

import styled from "styled-components";

const TwitBlock = styled.div`
  width: 100%;
  max-width: 560px;
  margin-top: 50px;
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

    & > form {
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
    }

    .twit__box-submit {
      display: flex;
      font-size: 12px;
      margin-top: 6px;
      justify-content: space-between;
    }
  }
`;

export const TwittWritingForm = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <TwitBlock>
      <div className='twit__box'>
        <div className='twit__box-user'>
          <img src={faker.image.imageUrl()} alt='유저' />
        </div>
        <form>
          <textarea type='text' placeholder='트윗 입력' />
          <div>
            <div className='twit__box-submit'>
              <input type='file' accept='image/*' hidden />
              <BiImageAlt fill={color.mainBlue} size={24} />
              <Button
                bgColor={color.mainBlue}
                color={color.white}
                type='submit'>
                Nweet!
              </Button>
            </div>
          </div>
        </form>
      </div>
    </TwitBlock>
  );
};
