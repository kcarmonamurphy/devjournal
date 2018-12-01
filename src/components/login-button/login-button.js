import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './login-button.less';
import view from './login-button.stache';

import firebase from 'firebase';

import * as firebaseConfig from '~/env/firebase.json';

console.log(firebaseConfig);

let config = firebaseConfig;
firebase.initializeApp(config);

let provider = new firebase.auth.GithubAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;

  console.log(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

  console.log(errorCode);
  // ...
}); 

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the login-button component'
  }
});

export default Component.extend({
  tag: 'login-button',
  ViewModel,
  view
});
