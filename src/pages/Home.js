import React, { useEffect, useState } from "react";
import Post from "components/Post";

import instagramText from "assets/images/insta-text.png";

import { db } from "utils/firebase";
import styled from "styled-components";

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
  justify-content: center;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;

  img {
    height: 40px;
    object-fit: contain;
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
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <AppContainer>
      <AppHeader>
        <img src={instagramText} alt="instagram text" />
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
