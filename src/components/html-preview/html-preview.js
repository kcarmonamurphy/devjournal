import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './html-preview.less';
import view from './html-preview.stache';

import showdown from 'showdown';

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the html-preview component'
  },

  htmloutput: {}

});

export default Component.extend({
  tag: 'html-preview',
  ViewModel,
  view
});
