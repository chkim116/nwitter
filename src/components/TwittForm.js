import React from "react";
import { useSelector } from "react-redux";
import { Button } from "style/button";
import { Input } from "style/input";

export const TwittForm = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div>{user.username}</div>
      <div>
        <div>
          <img src='' alt='아직없음' />
        </div>
        <div>트윗 내용</div>
        <div>
          <div>
            <Button type='button'>좋아요</Button>
            <Button type='button'>코멘트</Button>
          </div>

          <div>
            ...
            <div>
              <Button type='button'>수정</Button>
              <Button type='button'>삭제</Button>
            </div>
          </div>

          {/* 코멘트 누르면 보이게 */}
          <div>
            <div>댓글 달린거</div>
            <form>
              <Input type='text' placeholder='댓글입력' />
              <Button type='submit'>등록</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
