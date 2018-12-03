import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-debug#?./is-dev';

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
  },

  currentUser: {
    serialize: false,
  }
 
});

export default AppViewModel;
