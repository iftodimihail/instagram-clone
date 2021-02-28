import React, { useState } from "react";

import { Input } from "antd";

import { auth } from "utils/firebase";
import AuthContainer from "components/common/AuthContainer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setSignupError(error.message));
  };

  return (
    <AuthContainer
      errorMessage={signupError}
      handleSubmit={handleLogin}
      submitText="Login"
      redirectLink="/signup"
      redirectLinkText="Sign up"
    >
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
    </AuthContainer>
  );
}

export default Login;
