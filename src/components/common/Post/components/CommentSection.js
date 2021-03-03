import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  padding: 10px;
`;

function CommentSection({ comments }) {
  return (
    <CommentContainer>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.username}</strong> <span>{comment.text}</span>
        </div>
      ))}
    </CommentContainer>
  );
}

export default CommentSection;
