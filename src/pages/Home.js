import React, { useEffect, useState } from "react";
import Post from "components/common/Post";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Input, Dropdown, Menu, Modal, Upload, message, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import instagramText from "assets/images/insta-text.png";

import firebase, { auth, db, storage } from "utils/firebase";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const AppHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
  border-bottom: 1px solid lightgray;

  img {
    height: 40px;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .ant-dropdown-trigger {
    cursor: pointer;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppContent = styled.div`
  padding: 24px 0;
  height: 100%;
  width: 100%;
`;

function DropdownMenu({ username, openUploadModal }) {
  const menu = (
    <Menu>
      <Menu.Item key="upload" onClick={openUploadModal}>
        Upload
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="auth" onClick={() => auth.signOut()}>
        <span>Sign out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <span>{username}</span>
    </Dropdown>
  );
}

function ImageUpload({ isOpened, setIsOpened, username }) {
  const [file, setFile] = useState();
  const [photoCaption, setPhotoCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const { Dragger } = Upload;

  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },

    fileList: file ? [file] : [],
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      // progress function
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      // error function
      (error) => message.error(`${file.name} failed to upload.`),
      // complete function
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(async (imageUrl) => {
            await db.collection("posts").add({
              caption: photoCaption,
              imageUrl,
              username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setIsOpened(false);
            setPhotoCaption("");
            setFile("");
            setProgress(0);
          });
      }
    );
  };

  return (
    <Modal
      title="Upload image"
      visible={isOpened}
      onCancel={() => setIsOpened(false)}
      onOk={handleUpload}
    >
      <Input
        value={photoCaption}
        placeholder="Enter photo caption..."
        onChange={(e) => setPhotoCaption(e.target.value)}
      />
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      <Progress percent={progress} />
    </Modal>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isOpenUpload, setIsOpenUpload] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <img src={instagramText} alt="instagram text" />
        {user?.displayName ? (
          <DropdownMenu
            username={user?.displayName}
            openUploadModal={() => setIsOpenUpload(true)}
          />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </AppHeader>
      <AppContent>
        <PostsContainer>
          {posts.map(({ id, ...post }) => (
            <Post key={id} {...post} />
          ))}
        </PostsContainer>
      </AppContent>
      <ImageUpload
        isOpened={isOpenUpload}
        setIsOpened={setIsOpenUpload}
        username={user?.displayName}
      />
    </AppContainer>
  );
}

export default Home;
