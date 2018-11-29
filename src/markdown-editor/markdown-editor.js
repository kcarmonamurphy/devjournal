import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './markdown-editor.less';
import view from './markdown-editor.stache';

import showdown from 'showdown';

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the markdown-editor component'
  },

  markdown: {
  	get(lastValueSet) {
  		return lastValueSet;
  	}
  }

});

export default Component.extend({
  tag: 'markdown-editor',
  ViewModel,
  view
});
