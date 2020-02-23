import React from 'react';
import { withFirebase } from '~/modules/firebase/context';
import { useRouter } from 'next/router';

import styled from 'styled-components';

const LogoutButton = styled.span`
  display: inline;
  border: none;
  margin: 10px;
  cursor: pointer;
  color: ${props => props.theme.textLightMedium};
  background-color: white;
  padding: 0;

  &:hover {
    background-color: white;
  }
`;

const LogOutButton = (props:any|null) => {
  const router = useRouter();
  const onClickSignOut = () => {
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    props.firebase.doSignOut();
    router.push('/login');
  };
  return (
    <LogoutButton onClick={onClickSignOut}>
      登出
    </LogoutButton>
  );
};

export default withFirebase(LogOutButton);
