import { UserAside } from "components/UserAside";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

import { AppContent, AppLayout } from "style/applayout";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { twitts: AuthTwitt } = useSelector((state) => state.auth.user);
  const { hasTwitts } = useSelector((state) => state.get);

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
