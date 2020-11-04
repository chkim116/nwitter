import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";
import { logOut } from "modules/auth";
import { AppContent, AppLayout } from "style/applayout";

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
    <>
      <AppLayout>
        <UserAside user={user} onLogout={onLogout} />
        <AppContent>
          <TwittWritingForm />
          <TwittForm />
          <TwittForm />
          <TwittForm />
        </AppContent>
      </AppLayout>
    </>
  );
};
