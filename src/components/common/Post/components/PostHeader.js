import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

const PostHeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;
const UsernameText = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

function PostHeader({ username, avatar }) {
  return (
    <PostHeaderContainer>
      <Avatar alt={username} src={avatar}>
        {username[0].toUpperCase()}
      </Avatar>
      <UsernameText>{username}</UsernameText>
    </PostHeaderContainer>
  );
}

export default PostHeader;
