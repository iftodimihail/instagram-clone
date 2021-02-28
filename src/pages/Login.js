import React from "react";
import styled from "styled-components";

import { Input, Button } from "antd";

import instagramText from "assets/images/insta-text.png";

const LoginFormContainer = styled.form`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const CenteredWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <CenteredWrap>
      <LoginFormContainer>
        <Input
          autoComplete="username"
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
        />
        <Input
          autoComplete="new-password"
          type="password"
          label="Password"
          placeholder="Password"
          name="email"
        />
        <Button onClick={handleSubmit} type="primary">
          Login
        </Button>
      </LoginFormContainer>
    </CenteredWrap>
  );
}

export default Login;
