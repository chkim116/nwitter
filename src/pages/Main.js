import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";
import { AppContent, AppLayout } from "style/applayout";
import { addTwitt } from "modules/twit";
import { getTwitt } from "modules/get";
import { dbService } from "fbase";

export const Main = () => {
  const [twitt, setTwitt] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
          creator: user.id,
          createAt: new Date().toLocaleString("ko-KR"),
        })
      );
    },
    [twitt, dispatch]
  );

  return (
    <>
      <AppLayout>
        <UserAside user={user} />
        <AppContent>
          <TwittWritingForm
            onTwittText={onTwittText}
            onTwittSubmit={onTwittSubmit}
          />
          <TwittForm />
        </AppContent>
      </AppLayout>
    </>
  );
};
