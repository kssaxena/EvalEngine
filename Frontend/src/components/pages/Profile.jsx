import React from "react";
import ProfileStudent from "../ProfileStudent";
import { useSelector } from "react-redux";
import TeachersProfile from "../TeachersProfile";

const Profile = () => {
  const user = useSelector((store) => store.user.user);

  return (
    <div>
      {user[1] === "student" ? <ProfileStudent /> : <TeachersProfile />}
    </div>
  );
};

export default Profile;
