import React from 'react';

import LoginPage from '~/modules/login/LoginWithGoogle';
import styled from 'styled-components';

const Main = styled.div`
  background-color: rgb(240, 123, 103, 0.9);
  width: 100%;
  height: 100%;
`;

const Login = () => {
  return (
    <Main>
      <LoginPage />
    </Main>
  );
};

export default Login;
