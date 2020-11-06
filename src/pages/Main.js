import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";
import { AppContent, AppLayout } from "style/applayout";
import { addComment, addTwitt } from "modules/twit";

export const Main = () => {
  const [twitt, setTwitt] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { hasTwitts, twitts } = useSelector((state) => state.get);

  const onTwittText = useCallback(
    (e) => {
      setTwitt(e.target.value);
    },
    [twitt]
  );

  const onTwittSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        addTwitt({
          twitt: twitt,
          creator: user.username,
          creatorId: user.id,
          imgUrl: user.imgUrl || "",
          createAt: new Date().toLocaleString("ko-KR"),
        })
      );
      setTwitt("");
    },
    [twitt, dispatch]
  );

  //  comment

  const [commentText, setCommentText] = useState("");
  const onComment = useCallback(
    (e) => {
      setCommentText(e.target.value);
    },
    [commentText]
  );

  const onCommentSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { id } = e.target.dataset;
      const comment = {
        comment: commentText,
        id,
        creator: user.username,
        creatorId: user.id,
        profile: user.imgUrl || "",
        createAt: new Date().toLocaleString("ko-KR"),
      };
      dispatch(addComment(comment));
      setCommentText("");
    },
    [commentText, dispatch]
  );

  return (
    <>
      <AppLayout>
        <UserAside user={user} />
        <AppContent>
          <TwittWritingForm
            twitt={twitt}
            onTwittText={onTwittText}
            onTwittSubmit={onTwittSubmit}
          />
          {hasTwitts ? (
            <TwittForm
              hasTwitts={hasTwitts}
              twitts={twitts}
              onComment={onComment}
              onCommentSubmit={onCommentSubmit}
              commentText={commentText}
            />
          ) : (
            <div>로딩 중</div>
          )}
        </AppContent>
      </AppLayout>
    </>
  );
};
