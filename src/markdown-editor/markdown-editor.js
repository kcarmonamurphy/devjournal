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

// Get a reference to the database service
var database = firebase.database();

export const ViewModel = DefineMap.extend({
  htmloutput: {
    default: () => {
        return new showdown.Converter().makeHtml(template);
    }
  },

  markdown: {
    default: () => {
      return template;
    }
  },

  date: {},

  currentUser: {},

  init() {
    let database = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.currentUser = user;

            firebase.database().ref(`posts/${this.currentUser.uid}/${this.date}`).once('value').then((snapshot) => {
              this.markdown = snapshot.val().entry
            });

        } else {
            this.currentUser = null;   
        }
    });
  },

  markdownChanged() {
    // it's necessary to set the markdown property here because it needs to be triggered on
    // keydown and paste, not just when focus leaves the textarea
    this.markdown = document.querySelector('#markdown-editor-textarea').value;

    this.saveToFirebase();
    this.convertMarkdown();
  },

  saveToFirebase() {
    if (this.currentUser) {
      firebase.database().ref(`posts/${this.currentUser.uid}/${this.date}`).set({
          entry: this.markdown
      });
    }
  },

  convertMarkdown() {
    let html = new showdown.Converter().makeHtml(this.markdown);
    this.htmloutput = html;
  }

});

export default Component.extend({
  tag: 'markdown-editor',
  ViewModel,
  view
});
