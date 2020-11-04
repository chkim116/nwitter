import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import color from "style/color";
import { Button } from "style/button";

export const UserAside = ({ user, onLogout }) => {
  return (
    <div>
      <FaTwitter fill={color.mainBlue} size={30} />
      <div>
        <div>Wecolme! {user.username}</div>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <div>
          <Link to='/user/3'>Profile</Link>
        </div>
        <div>
          <Link to='/user/3/likes'>Like Lists</Link>
        </div>
        <Button type='button' onClick={onLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};
