import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withFirebase } from '~/modules/firebase/context';
import styled from 'styled-components';

import Icon from '~/modules/common/component/Icon';

const Logo = styled.h1`
  text-align: left;
  font-size: 32px;
  color: white;
  padding: 20px;
  margin-top: 0;
  margin-left: 10px;
  font-weight: 400;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 42px;
  color: white;
  letter-spacing: 3px;
  font-weight: 350;
`;

const SubTitle = styled.h2`
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: white;
  font-weight: 350;
  margin-bottom: 30px;
`;

const WhiteLine = styled.hr`
  border: 1px solid white;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 75%;
  margin-top: 0;
  line-height: 0;
  font-weight: 350;
  font-size: 14px;
  background-color: ${props => props.theme.justWhite};
  color: ${props => props.theme.textDark};

  &:hover {
    background: ${props => props.theme.justWhite};
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  padding: 5px;
  border-right: 1px solid ${props => props.theme.textLightMedium};
  background-color: ${props => props.theme.justWhite};
  fill: blue;
  transition: 0.3s;
`;

const CenterGroup = styled.div`
  width: 60%;
  height: 30%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

const LoginFormBase = (props:any|null) => {
  const router = useRouter();
  const [error, setError] = useState({message: ''});
  const TEN_MINUTES = 10*60;

  const setCookie = (cname: string, cvalue: string, exseconds: number) => {
    let d = new Date();
    d.setTime(d.getTime() + (exseconds*1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  };  

  const onLoginWithGoogle = () => {
    props.firebase
      .doSignInWithGoogle()
      .then((socialAuthUser:any|null) => {
        const loginData = {
          'displayName': socialAuthUser.user.displayName,
          'email': socialAuthUser.user.email,
          'emailVerified': socialAuthUser.user.emailVerified,
          'isAnonymous': socialAuthUser.user.isAnonymous,
          'metadata': socialAuthUser.user.metadata,
          'phoneNumber': socialAuthUser.user.phoneNumber,
          'photoURL': socialAuthUser.user.photoURL,
          'providerData': socialAuthUser.user.providerData,
          'providerId': socialAuthUser.user.providerId,
          'refreshToken': socialAuthUser.user.refreshToken,
          'uid': socialAuthUser.user.uid,
        };
        fetch(`${process.env.API_URL}login`, {
          body: JSON.stringify(loginData),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        })
        // .then((response:any) => response.json()) // 輸出成 json
          .then((response:any|null) => {
            if (response.status === 200) {
              setCookie('uid', socialAuthUser.user.uid, TEN_MINUTES);
              router.push('/');
            } else {
              console.error('Error:');
            }
          })
          .catch((error:any) => console.error('Error:', error));
      })
      .then(() => {
        setError({ message: '' });
      })
      .catch((error:{ message: string }) => {
        setError({ message: error.message });
      });
  };

  return (
    <>
      <Logo>SYNC</Logo>
      <CenterGroup>
        <Title>登入/註冊</Title>
        <SubTitle>Sign in to get your personalized story recommadations, follow authors and topics you love, and interact with stories.</SubTitle>
        <WhiteLine/>
        <ButtonGroup>
          <StyledButton size={40} onClick={onLoginWithGoogle}>
            <StyledIcon size={40} type='google'/>以 Google 帳號登入
          </StyledButton>
        </ButtonGroup>
        <ButtonGroup>
          <StyledButton size={40}>
            <StyledIcon size={40} type='fb'/>以 Facebook 帳號登入
          </StyledButton>
        </ButtonGroup>
        { error }
      </CenterGroup>
    </>
  );
};

const LoginForm = withFirebase(LoginFormBase);

export default LoginForm;
