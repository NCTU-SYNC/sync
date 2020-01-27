import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { withFirebase } from '~/modules/firebase/context';

const SignUpFormBase = (props: any|null) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState({message: ''});

  const submitToFirebase = () => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        router.push('/login');
      })
      .catch((error:any) => {
        setError(error.message);
      });
  };

  return (
    <>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button 
        onClick={submitToFirebase}
        disabled={
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === ''
        }
      >
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
};

const SignUpForm = withFirebase(SignUpFormBase);

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
);

export default SignUpPage;
