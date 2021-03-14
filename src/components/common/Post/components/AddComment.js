import { Button, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import firebase, { db } from "utils/firebase";

const AddCommentContainer = styled.div`
  position: relative;
  display: flex;
`;

const PostButton = styled(Button)`
  position: absolute;
  right: 0;
  padding: 0 10px 0 5px;
  height: 100%;

  :hover,
  :focus {
    background-color: transparent;
    color: #5094ce;
  }
`;

const CommentInput = styled(Input)`
  border: 0;
  border-radius: 0;
  border-top: 1px solid lightgray;
  padding: 10px 50px 10px 10px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  :focus,
  :hover {
    border-color: lightgray;
    box-shadow: none;
  }
`;

function AddComment({ postId, user }) {
  const [commentText, setCommentText] = useState("");

  if (!user) {
    return null;
  }

  const postComment = () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        username: user.displayName,
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setCommentText(""));
  };

  return (
    <AddCommentContainer>
      <CommentInput
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <PostButton type="text" onClick={postComment} disabled={!commentText}>
        Post
      </PostButton>
    </AddCommentContainer>
  );
}

export default AddComment;
