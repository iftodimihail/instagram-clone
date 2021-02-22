import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

const PostHeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;

  span {
    font-weight: 600;
    margin-left: 10px;
  }
`;

function PostHeader({ username, avatar }) {
  return (
    <PostHeaderContainer>
      <Avatar alt={username} src={avatar} />
      <span>{username}</span>
    </PostHeaderContainer>
  );
}

export default PostHeader;
