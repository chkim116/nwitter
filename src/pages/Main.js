import { logOut } from "modules/auth";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";

export const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const onLogout = useCallback(
    (e) => {
      dispatch(logOut());
    },
    [dispatch]
  );
  return (
    <div>
      <UserAside user={user} onLogout={onLogout} />
      <TwittWritingForm />
      <TwittForm />
    </div>
  );
};
