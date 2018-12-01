import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './login-button.less';
import view from './login-button.stache';

import {firebase, config, provider} from '~/firebase-initialize';

// console.log(firebase, config, provider);



export const ViewModel = DefineMap.extend({
  anchor: {
    default: 'Log in'
  },

  currentUser: {
  	default: null
  },

  dropdownOpen: {},

  toggleDropdown() {
  	this.dropdownOpen = !this.dropdownOpen;
  },

  init() {
  	firebase.auth().onAuthStateChanged((user) => {
  		if (user) {
    		this.currentUser = user;
    		console.log(user);
  		} else {
    		this.currentUser = null;
  		}
	});
  },

  signOut() {
  	firebase.auth().signOut().then(() => {
  		this.currentUser = null;
  	});
  },

  signIn() {
  	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	  this.anchor = user.displayName;

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
  }
});

export default Component.extend({
  tag: 'login-button',
  ViewModel,
  view
});