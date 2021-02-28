import React, { useState } from "react";

import { Input } from "antd";

import { auth } from "utils/firebase";
import AuthContainer from "components/common/AuthContainer";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleSignUp = () => {
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
    <AuthContainer
      errorMessage={signupError}
      handleSubmit={handleSignUp}
      submitText="Sign up"
      redirectLink="/login"
      redirectLinkText="Login"
    >
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
    </AuthContainer>
  );
}

export default SignUp;
