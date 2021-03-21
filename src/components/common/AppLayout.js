import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Menu, Dropdown } from "antd";

import instagramText from "assets/images/insta-text.png";
import { auth } from "utils/firebase";
import UploadModal from "components/UploadModa";

const AppContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
`;

const AppHeader = styled.header`
  position: sticky;
  background-color: #fff;
  z-index: 10;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
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

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppContentContainer = styled.div`
  padding: 24px 0;
  height: 100%;
  width: 100%;
`;

function DropdownMenu({ username, openUploadModal }) {
  const menu = (
    <Menu>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
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

function AppLayout({ children }) {
  const [user, setUser] = useState();
  const [isOpenUpload, setIsOpenUpload] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

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
      <AppContentContainer>
        <AppContent>{children}</AppContent>
      </AppContentContainer>
      <UploadModal
        isOpened={isOpenUpload}
        setIsOpened={setIsOpenUpload}
        username={user?.displayName}
      />
    </AppContainer>
  );
}

export default AppLayout;
