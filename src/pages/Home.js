import React, { useEffect, useState } from "react";
import Post from "components/common/Post";

import instagramText from "assets/images/insta-text.png";

import { auth, db } from "utils/firebase";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

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

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <img src={instagramText} alt="instagram text" />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </AppHeader>
      <AppContent>
        <PostsContainer>
          {posts.map(({ id, ...post }) => (
            <Post key={id} {...post} />
          ))}
        </PostsContainer>
      </AppContent>
    </AppContainer>
  );
}

export default Home;
