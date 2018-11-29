import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-debug#?./is-dev';

import showdown from 'showdown';

const AppViewModel = DefineMap.extend({
  env: {
    default: () => ({NODE_ENV:'development'}),
    serialize: false
  },
  message: {
    default: 'Hello World!',
    serialize: false
  },
  title: {
    default: 'devjournal',
    serialize: false
  },


  markdown: {

  },

  htmloutput: {
    default: 'HTML output will appear here',
    get() {
      return new showdown.Converter().makeHtml(this.markdown);
    }
  }

});

export default AppViewModel;
