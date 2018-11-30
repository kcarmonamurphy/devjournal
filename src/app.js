import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-debug#?./is-dev';

import firebase from 'firebase';

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBMytsk6g3a1fQUthluL9RnZZzAsz40Kw0",
  authDomain: "devjournal-firebase.firebaseapp.com",
  databaseURL: "https://devjournal-firebase.firebaseio.com",
  projectId: "devjournal-firebase",
  storageBucket: "devjournal-firebase.appspot.com",
  messagingSenderId: "259340547619"
};
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

const AppViewModel = DefineMap.extend({
  env: {
    default: () => ({NODE_ENV:'development'}),
    serialize: false
  },
  date: {
    default: () => {
      let datestring = new Date(Date.now()).toISOString();
      return datestring.substring(0, datestring.indexOf('T'));
    },
    serialize: false
  },
  title: {
    default: 'devjournal',
    serialize: false
  },

  htmloutput: {
    serialize: false
  }
});

export default AppViewModel;
