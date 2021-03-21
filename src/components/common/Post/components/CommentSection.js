import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { db } from "utils/firebase";

const CommentsContainer = styled.div`
  padding: 10px;
`;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteIcon = styled(DeleteOutlined)`
  cursor: pointer;
`;

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [showDeleteIndex, setShowDelete] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return () => unsubscribe();
  }, [postId]);

  const onCommentDelete = (commentId) => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .delete();
  };

  function renderComment(comment, index) {
    return (
      <Comment
        key={comment.id}
        onMouseEnter={() => setShowDelete(index)}
        onMouseLeave={() => setShowDelete()}
      >
        <div>
          <strong>{comment.username}</strong> <span>{comment.text}</span>
        </div>
        {showDeleteIndex === index ? (
          <DeleteIcon onClick={() => onCommentDelete(comment.id)} />
        ) : null}
      </Comment>
    );
  }

  return <CommentsContainer>{comments.map(renderComment)}</CommentsContainer>;
}

export default CommentSection;
