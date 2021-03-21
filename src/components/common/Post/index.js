import React from "react";
import styled from "styled-components";
import ActionMenu from "./components/ActionMenu";
import AddComment from "./components/AddComment";
import CommentSection from "./components/CommentSection";
import PostHeader from "./components/PostHeader";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #fff;
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
  padding: 10px;
  display: flex;

  > strong {
    margin-right: 5px;
  }
`;

function Post({ id, imageUrl, username, user, avatar, caption }) {
  return (
    <PostContainer>
      <PostHeader username={username} avatar={avatar} />
      <ImageContainer>
        <img src={imageUrl} alt="insta pic" />
      </ImageContainer>
      <ActionMenu postId={id} user={user} />
      <Description>
        <strong>{username}</strong>
        {caption}
      </Description>
      {/* timestamp */}
      {/* comments */}
      <CommentSection postId={id} />
      <AddComment postId={id} user={user} />
    </PostContainer>
  );
}

export default Post;
