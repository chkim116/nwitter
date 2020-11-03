import React from "react";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";

export const Main = () => {
  return (
    <div>
      <UserAside />
      <TwittWritingForm />
      <TwittForm />
    </div>
  );
};
