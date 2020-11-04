import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";

import { logOut } from "modules/auth";

import styled from "styled-components";

const MainBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  .twit {
    display: flex;
    max-width: 1000px;
    width: 100%;
    align-items: center;
    flex-direction: column;
  }
`;

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
      <MainBlock>
        <UserAside user={user} onLogout={onLogout} />
        <div className='twit'>
          <TwittWritingForm />
          <TwittForm />
        </div>
      </MainBlock>
    </>
  );
};
