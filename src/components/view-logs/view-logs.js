import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './view-logs.less';
import view from './view-logs.stache';

import {firebase, config, provider} from '~/firebase-initialize';

const sortObjectDecreasingOrder = (object) => {
    return Object.keys(object).sort().reverse().reduce((r, k) => (r[k] = object[k], r), {});
}

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the view-logs component'
  },

  currentUser: {},

  init() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // if logged in, grab saved markdown from database
        this.currentUser = user;
        this.loadMarkdownFromFirebase();
      } else {
        // if logged out, clean up markdown textarea and html preview
        this.currentUser = null;
        //this.loadDefaultMarkdown();
      }
    });

  },

  posts: {},

  loadMarkdownFromFirebase() {
    firebase.database().ref(`posts/${this.currentUser.uid}/`).orderByKey().on('value', (snapshot) => {
      if (snapshot.val()) {
        this.posts = sortObjectDecreasingOrder(snapshot.val());
        console.log(this.posts);
      } else {
        this.loadDefaultMarkdown();
      }
    });
  },
});

export default Component.extend({
  tag: 'view-logs',
  ViewModel,
  view
});
