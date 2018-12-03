import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import 'can-debug#?./is-dev';

const AppViewModel = DefineMap.extend({
  env: {
    default: () => ({NODE_ENV:'development'}),
    serialize: false
  },

  page: 'string',


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

route.register("/", { page: "today" });
route.register("logs", { page: "logs" });
route.register("logs/{date}", { page: "logview"});
route.register("profile", { page: "profile" });

route.start();

export default AppViewModel;

