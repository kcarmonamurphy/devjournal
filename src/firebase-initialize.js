import * as firebase from 'firebase';
import * as firebaseConfig from './env/firebase.json';

firebase.initializeApp(firebaseConfig);

let provider = new firebase.auth.GithubAuthProvider();

export {
  firebase as firebase,
  firebaseConfig as config,
  provider as provider
};