import React from "react";
import { Link } from "react-router-dom";

export const UserAside = ({ user, onLogout }) => {
  return (
    <div>
      <div>
        <div>
          <Link to='/user/3'>유저</Link>
        </div>
        <div>{user.username}</div>
      </div>
      <button type='button' onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
};
