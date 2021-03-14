import { Avatar } from "antd";
import React from "react";
import styled from "styled-components";
import { auth } from "utils/firebase";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileDetails = styled.div`
  display: flex;
`;

const ProfilePosts = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Profile() {
  return (
    <ProfileContainer>
      <ProfileDetails>
        <Avatar>{auth.currentUser?.displayName?.[0]?.toUpperCase()}</Avatar>
        {auth.currentUser.displayName}
      </ProfileDetails>
      <ProfilePosts></ProfilePosts>
    </ProfileContainer>
  );
}

export default Profile;
