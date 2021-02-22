import React from "react";
import styled from "styled-components";
import ActionMenu from "./components/ActionMenu";
import PostHeader from "./components/PostHeader";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 600px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 100%;
    object-fit: contain;
  }
`;

const Description = styled.div`
  display: flex;
  > strong {
    margin-right: 5px;
  }
`;

const ActionContainer = styled.div`
  height: 100px;
  padding: 4px 8px;
`;

function Post({ image, username, avatar, caption }) {
  return (
    <PostContainer>
      <PostHeader username={username} avatar={avatar} />
      <ImageContainer>
        <img src={image} alt="insta pic" />
      </ImageContainer>
      <ActionContainer>
        <ActionMenu />
        {/* likes nr */}
        <Description>
          <strong>{username}</strong>
          {caption}
        </Description>
        {/* timestamp */}
        {/* comments */}
        {/* add a comment */}
      </ActionContainer>
    </PostContainer>
  );
}

export default Post;
