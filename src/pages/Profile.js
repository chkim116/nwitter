import React from "react";
import { useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <ProfileBanner />
      <ProfileForm user={user} />
      <TwittForm />
    </div>
  );
};
