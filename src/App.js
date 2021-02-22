import React from "react";
import styled from "styled-components";
import instagramText from "./assets/images/insta-text.png";
import Post from "./components/Post";

import testPic from "assets/images/insta-pic1.jpg";
import testPic2 from "assets/images/insta-pic2.png";

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
  return (
    <AppContainer>
      <AppHeader>
        <img src={instagramText} alt="instagram text" />
      </AppHeader>
      <Post username="mihaiiftodi" image={testPic} caption="Statue picture" />
      <Post username="alexandrucojo" image={testPic2} caption="sunset" />
    </AppContainer>
  );
}

export default App;
