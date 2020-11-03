import React from "react";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";
import { TwittForm } from "../components/TwittForm";

export const Profile = () => {
  return (
    <div>
      <ProfileBanner />
      <ProfileForm />
      <TwittForm />
    </div>
  );
};
