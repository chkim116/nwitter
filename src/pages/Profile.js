import { UserAside } from "components/UserAside";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

import { AppContent, AppLayout } from "style/applayout";
import { dbService } from "fbase";
import { getAuthTwitt } from "modules/auth";

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { twitts: AuthTwitt } = useSelector((state) => state.auth.user);
  const { hasTwitts } = useSelector((state) => state.get);
  const { hasTwitts: userTwitts } = useSelector((state) => state.auth);

  useEffect(() => {
    const getTwit = async () => {
      try {
        await dbService.collection("nweets").onSnapshot((snapshot) => {
          const array = snapshot.docs.map((doc) => [
            { ...doc.data(), id: doc.id },
          ]);
          dispatch(getAuthTwitt(array));
        });
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
        {hasTwitts ? <TwittForm AuthTwitt={AuthTwitt} /> : <div>로딩</div>}
      </AppContent>
    </AppLayout>
  );
};
