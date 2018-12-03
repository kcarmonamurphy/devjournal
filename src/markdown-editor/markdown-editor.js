import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './markdown-editor.less';
import view from './markdown-editor.stache';

import showdown from 'showdown';

import {firebase, config, provider} from '~/firebase-initialize';

const template = `### edit me
*i'm markdown*
- make a list
1. maybe it's numbered`;


export const ViewModel = DefineMap.extend({
  htmloutput: {
    get() {
      return new showdown.Converter().makeHtml(this.markdown);
    }
  },

  markdown: {},

  date: {},

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
        this.loadDefaultMarkdown();
      }
    });
  },

  loadDefaultMarkdown() {
    this.markdown = template;
    this.htmloutput = new showdown.Converter().makeHtml(template);
  },

  loadMarkdownFromFirebase() {
    firebase.database().ref(`posts/${this.currentUser.uid}/${this.date}`).once('value').then((snapshot) => {
      if (snapshot.val()) {
        this.markdown = snapshot.val().entry
      } else {
        this.loadDefaultMarkdown();
      }
    });
  },

  markdownChanged() {
    // it's necessary to set the markdown property here because it needs to be triggered on
    // keydown and paste, not just when focus leaves the textarea
    this.markdown = document.querySelector('#markdown-editor-textarea').value;

    this.saveToFirebase();
  },

  saveToFirebase() {
    if (this.currentUser) {
      firebase.database().ref(`posts/${this.currentUser.uid}/${this.date}`).set({
          entry: this.markdown
      });
    }
  }

});

export default Component.extend({
  tag: 'markdown-editor',
  ViewModel,
  view
});
