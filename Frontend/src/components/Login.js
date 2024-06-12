// src/components/Login.js

import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = ({ onLoginSuccess }) => {
  const handleLoginSuccess = (response) => {
    onLoginSuccess(response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.error(response);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
