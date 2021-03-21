import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { db } from "utils/firebase";

const ActionMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;

  svg {
    cursor: pointer;
    font-size: 20px;
  }
`;

const ActionButton = styled(Button)`
  background: transparent;
  padding: 0;
  color: inherit;
  border: 0;
  box-shadow: none;

  :hover,
  :focus {
    background: transparent;
    color: inherit;
    outline: none;
  }
`;

const RedHeartFilled = styled(HeartFilled)`
  color: #fd1d1d;
`;

const UserLikeContainer = styled.div`
  margin-bottom: 10px;

  strong {
    margin-left: 5px;
  }
`;

function ActionMenu({ postId, user }) {
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();
  const [openedLikesModal, setOpenedLikesModal] = useState(false);

  const postLikesCollection = useMemo(
    () => db.collection("posts").doc(postId).collection("likes"),
    [postId]
  );

  useEffect(() => {
    postLikesCollection.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikes(docs);
      setAlreadyLiked(docs.find((like) => like.username === user?.displayName));
    });
  }, [user, postLikesCollection]);

  const handleLikePost = async () => {
    if (!!alreadyLiked) {
      await postLikesCollection.doc(alreadyLiked.id).delete();
    } else {
      postLikesCollection.add({
        username: user.displayName,
      });
    }
  };

  return (
    <ActionMenuContainer>
      <ActionButton type="text" onClick={handleLikePost}>
        {alreadyLiked ? <RedHeartFilled /> : <HeartOutlined />}
      </ActionButton>
      <ActionButton onClick={() => setOpenedLikesModal(true)} role="button">
        {likes && (
          <strong>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </strong>
        )}
      </ActionButton>
      <Modal
        onCancel={() => setOpenedLikesModal(false)}
        title="Likes"
        footer={null}
        visible={openedLikesModal}
      >
        {likes.map(({ username }) => (
          <UserLikeContainer key={username}>
            <Avatar>{username[0].toUpperCase()}</Avatar>
            <strong>{username}</strong>
          </UserLikeContainer>
        ))}
      </Modal>
    </ActionMenuContainer>
  );
}

export default ActionMenu;
