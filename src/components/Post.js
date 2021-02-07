import React from 'react';
import styled from "styled-components";
import testPic from "../assets/images/insta-pic1.jpg";

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width:100%;
    object-fit: contain;
  }
`;

const ActionContainer = styled.div`
  height: 100px;
`;

function Post() {
  return (
    <PostContainer>
      <ImageContainer>
        <img src={testPic} alt="insta pic"/>
      </ImageContainer>
      <ActionContainer>
      {/* action menu */}
      {/* likes nr */}
      {/* description */}
      {/* timestamp */}
      {/* comments */}
      {/* add a comment */}
      </ActionContainer>
    </PostContainer>
  )
}

export default Post;
