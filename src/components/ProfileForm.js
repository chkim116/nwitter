import React from "react";
import { useHistory } from "react-router-dom";

export const ProfileForm = ({ user }) => {
  const history = useHistory();

  return (
    <>
      <div>{user.username}</div>
      <button type='button' onClick={() => history.goBack()}>
        뒤로가기
      </button>
    </>
  );
};
