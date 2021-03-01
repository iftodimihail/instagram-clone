import React from "react";
import styled from "styled-components";

import instagramText from "assets/images/insta-text.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

const SignUpContainer = styled.div`
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
  flex-direction: column;
`;

const Error = styled.span`
  color: red;
`;

function AuthContainer({
  children,
  errorMessage,
  handleSubmit,
  submitText,
  redirectLink,
  redirectLinkText,
}) {
  return (
    <CenteredWrap>
      <SignUpContainer>
        <LogoContainer>
          <img src={instagramText} alt="instagram logo" />
        </LogoContainer>
        {children}
        <Error>{errorMessage}</Error>
        <Button type="primary" onClick={handleSubmit}>
          {submitText}
        </Button>
        <Link to={redirectLink}>{redirectLinkText}</Link>
      </SignUpContainer>
    </CenteredWrap>
  );
}

export default AuthContainer;
