import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from '../../../constant/constant';

class Firebase {
  public auth: any|null = null;
  public constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.auth = firebase.auth();
  }

  public doCreateUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  public doSignInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public doSignOut = () => {
    return this.auth.signOut();
  }
}

export default Firebase;
