import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Input, Button } from "antd";

import instagramText from "assets/images/insta-text.png";
import { useHistory } from "react-router";
import { auth } from "utils/firebase";
import { Link } from "react-router-dom";

const LoginFormContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
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

function Login() {
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

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setSignupError(error.message));
  };

  return (
    <CenteredWrap>
      <LoginFormContainer>
        <LogoContainer>
          <img src={instagramText} alt="instagram logo" />
        </LogoContainer>
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
        <Button onClick={handleLogin} type="primary">
          Login
        </Button>
        <Link to="/signup">Sign up</Link>
      </LoginFormContainer>
    </CenteredWrap>
  );
}

export default Login;
