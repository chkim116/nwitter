import { UserAside } from "components/UserAside";
import React from "react";
import { useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

import { AppContent, AppLayout } from "style/applayout";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <AppLayout>
      <UserAside />
      <AppContent>
        <ProfileBanner />
        <ProfileForm user={user} />
        <TwittForm />
      </AppContent>
    </AppLayout>
  );
};
