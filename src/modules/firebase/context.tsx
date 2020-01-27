import React from 'react';

const FirebaseContext = React.createContext<any|null>(null);

export const withFirebase = (Component:any) => (props:any) => (
  <FirebaseContext.Consumer>
    {value => <Component {...props} firebase={value} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
