import { UserAside } from "components/UserAside";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

import firebase from "firebase/app";
import { AppContent, AppLayout } from "style/applayout";
import { dbService } from "fbase";
import { getAuthTwitt } from "modules/auth";
import { addComment, addLikes, addUnLikes } from "modules/twit";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { hasTwitts } = useSelector((state) => state.get);
  const { twitts: AuthTwitt } = useSelector((state) => state.auth.user);
  const { hasTwitts: userTwitts } = useSelector((state) => state.auth);

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

  // like
  const isLike = useSelector((state) => state.twit.isLike);
  const twitt = useSelector((state) => state.get.twitts);
  const onLike = useCallback(
    (e) => {
      const { id } = e.target.dataset;
      const addLike = {
        id,
        userId: user.id,
      };
      const getLikes = async () => {
        try {
          await dbService
            .doc(`nweets/${id}`)
            .get()
            .then((snapshot) => {
              const likeArray = snapshot.data();
              likeArray.likes.find((v) => v === user.id)
                ? dispatch(addUnLikes(addLike))
                : dispatch(addLikes(addLike));
            });
        } catch (err) {
          console.log(err);
        }
      };
      if (id) {
        getLikes();
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const getTwit = async () => {
      try {
        if (user.id !== null && user.id !== undefined) {
          await dbService
            .collection("nweets")
            .where("creatorId", "==", user.id)
            .orderBy("createAt", "asc")
            .limit(5)
            .onSnapshot((snapshot) => {
              const array = snapshot.docs.map((doc) => [
                { id: doc.id, ...doc.data() },
              ]);
              dispatch(getAuthTwitt(array));
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (userTwitts) {
      return console.log("이미 불러옴");
    }
    getTwit();
  }, []);

  return (
    <AppLayout>
      <UserAside />
      <AppContent>
        <ProfileBanner />
        <ProfileForm user={user} />
        {hasTwitts ? (
          <TwittForm
            AuthTwitt={AuthTwitt}
            onComment={onComment}
            onCommentSubmit={onCommentSubmit}
            onLike={onLike}
            isLike={isLike}
          />
        ) : (
          <div>로딩</div>
        )}
      </AppContent>
    </AppLayout>
  );
};
