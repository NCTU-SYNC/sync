import React from 'react';

import { withFirebase } from '~/modules/firebase/context';

const LogOutButton = (props:any|null) => (
  <button type="button" onClick={props.firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(LogOutButton);
