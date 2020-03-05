import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from '../component/Link';
import Icon from '../component/Icon';

import LogoutButton from '~/modules/logout/logout';
import { withFirebase } from '~/modules/firebase/context';

const Main = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${props => props.theme.HEADER_HEIGHT}px;
  padding: 30px 20px 35px;
  background-color: ${props => props.theme.justWhite};

  /* &::after {
    content: '';
    position: absolute;
    display: inline-block;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 80px);
    height: 1px;
    background-color: ${props => props.theme.textLight};
  } */
`;

const Logo = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: ${props => props.theme.textLightMedium};
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  margin: 10px;
  color: ${props => props.theme.textLightMedium};
`;

const Navbar = (props:any|null) => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    let listener = props.firebase.auth.onAuthStateChanged(
      (authUser:any|null) => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null);
      },
    );
    return listener();
  });

  return (
    <Main>
      <Link>
        <Logo>SYNC</Logo>
      </Link>

      {
        authUser ?
          <LinksWrapper>
            <StyledLink to='/notification'><Icon size={18} type='bell'/></StyledLink>
            <StyledLink to='/user'>個人帳戶</StyledLink>
            <LogoutButton />
          </LinksWrapper>
          :
          <LinksWrapper>
            <StyledLink to='/notification'><Icon size={18} type='bell'/></StyledLink>
            <StyledLink to='/login'>登入</StyledLink>
          </LinksWrapper>
      }
    </Main>
  );
};

export default withFirebase(Navbar);
