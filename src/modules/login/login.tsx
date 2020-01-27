import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { withFirebase } from '~/modules/firebase/context';

const SignUpLink = () => (
  <p>
    Do not have an account? <a href="/sign_up">Sign Up</a>
  </p>
);

const LoginPage = () => (
  <div>
    <h1>SignIn</h1>
    <LoginForm />
    <SignUpLink />
  </div>
);

const LoginFormBase = (props:any|null) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({message: ''});

  const onSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        router.push('/');
      })
      .catch((error:any) => {
        setError(error.message);
      });
  };

  return (
    <>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button 
        onClick={onSubmit}
        disabled={password === '' || email === ''}>
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
};

const LoginForm = withFirebase(LoginFormBase);

export default LoginPage;
