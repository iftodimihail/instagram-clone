import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instagramText from "./assets/images/insta-text.png";
import Post from "./components/Post";

import testPic from "assets/images/insta-pic1.jpg";
import testPic2 from "assets/images/insta-pic2.png";
import { db } from "utils/firebase";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

function App() {
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
      {posts.map(({ id, ...post }) => (
        <Post key={id} {...post} />
      ))}
    </AppContainer>
  );
}

export default App;
