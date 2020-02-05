import React from 'react';
import { withFirebase } from '~/modules/firebase/context';
import { useRouter } from 'next/router';

const LogOutButton = (props:any|null) => {
  const router = useRouter();
  const onClickSignOut = () => {
    document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    props.firebase.doSignOut();
    router.push('/');
  };
  return (
    <button type="button" onClick={onClickSignOut}>
      Sign Out
    </button>
  );
};

export default withFirebase(LogOutButton);
