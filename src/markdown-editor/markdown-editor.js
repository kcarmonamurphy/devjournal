import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './markdown-editor.less';
import view from './markdown-editor.stache';

import showdown from 'showdown';

const template = `### edit me
*i'm markdown*
- make a list
1. maybe it's numbered`;

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

  convertMarkdown() {
    let markdown = document.querySelector('#markdown-editor-textarea').value;
    let html = new showdown.Converter().makeHtml(markdown);
    this.htmloutput = html;
  }

});

export default Component.extend({
  tag: 'markdown-editor',
  ViewModel,
  view
});
