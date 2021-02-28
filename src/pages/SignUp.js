import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Input, Button } from "antd";

import instagramText from "assets/images/insta-text.png";
import { auth } from "utils/firebase";

const SignUpContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 300px;

  > * {
    margin-bottom: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 40px;
    object-fit: contain;
  }
`;

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.span`
  color: red;
`;

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        history.push("/");
      }
    });

    return () => unsubscribe();
  }, [history]);

  const handleSubmit = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) =>
        user.updateProfile({
          displayName: username,
        })
      )
      .catch((error) => setSignupError(error.message));
  };

  return (
    <CenteredWrap>
      <SignUpContainer>
        <LogoContainer>
          <img src={instagramText} alt="instagram logo" />
        </LogoContainer>
        <Input
          autoComplete="username"
          label="Username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          autoComplete="username"
          type="email"
          label="Email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          autoComplete="new-password"
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Error>{signupError}</Error>
        <Button type="primary" onClick={handleSubmit}>
          Sign up
        </Button>
      </SignUpContainer>
    </CenteredWrap>
  );
}

export default SignUp;
