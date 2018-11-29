import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './html-preview.less';
import view from './html-preview.stache';

export const ViewModel = DefineMap.extend({
  message: {
    default: 'This is the html-preview component'
  }
});

export default Component.extend({
  tag: 'html-preview',
  ViewModel,
  view
});
