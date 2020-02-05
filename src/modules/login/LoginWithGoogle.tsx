import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withFirebase } from '~/modules/firebase/context';

const LoginPage = () => (
  <div>
    <h1>SignIn</h1>
    <LoginForm />
  </div>
);

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
        // console.log(socialAuthUser.user.displayName);
        // console.log(socialAuthUser.user.email);
        // console.log(socialAuthUser.user.emailVerified);
        // console.log(socialAuthUser.user.isAnonymous);
        // console.log(socialAuthUser.user.metadata);
        // console.log(socialAuthUser.user.phoneNumber);
        // console.log(socialAuthUser.user.photoURL);
        // console.log(socialAuthUser.user.providerData);
        // console.log(socialAuthUser.user.providerId);
        // console.log(socialAuthUser.user.refreshToken);
        // console.log(socialAuthUser.user.uid);
        setCookie('uid', socialAuthUser.user.uid, TEN_MINUTES);
      })     
      .then(() => {
        setError({ message: '' });
        router.push('/');
      })
      .catch((error:{ message: string }) => {
        setError({ message: error.message });
      });
  };
  return (
    <>
      <button onClick={onLoginWithGoogle}>Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </>
  );
};

const LoginForm = withFirebase(LoginFormBase);

export default LoginPage;
