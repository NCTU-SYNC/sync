import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from '~/config/firebaseConfig';

class Firebase {
  auth: any|null = null;
  googleProvider: any|null = null;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.auth = firebase.auth();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  doSignInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  doSignOut = () => {
    return this.auth.signOut();
  }
  doSignInWithGoogle = () => {
    return this.auth.signInWithPopup(this.googleProvider);
  }
  getIdToken = () => {
    return this.auth.currentUser.getIdToken(true);
  }

}

export default Firebase;
