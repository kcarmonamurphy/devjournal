require('core-js/client/core');

var _ = {
  defaults: require('lodash/defaults'),
  delay: require('lodash/delay')
};
var feathers = require('feathers/client');
var rest = require('feathers-rest/client');
var superagent = require('superagent/lib/client');
var io = require('socket.io-client/dist/socket.io');
var socketio = require('feathers-socketio/client');

var ready = require('./docready');
var Runner = require('./runner');
var setupQunit = require('./adapters/qunit');
var setupJasmine1 = require('./adapters/jasmine-legacy');
var setupJasmine = require('./adapters/jasmine');
var setupMocha = require('./adapters/mocha');

ready(function() {
  var options = window.Testee = window.Testee || {};
  options.baseURL = options.baseURL || window.location.protocol + '//' + window.location.host;

  if(!options.app) {
    if(options.provider && options.provider.type === 'rest') {

      var restService = rest(options.baseURL).superagent(superagent);
      options.app = feathers().configure(restService);
    } else {
      options.socket = options.socket || io(options.baseURL);
      options.app = feathers().configure(socketio(options.socket));
    }
  }

  _.defaults(options, {
    runs: options.app.service('api/runs'),

    suites: options.app.service('api/suites'),

    tests: options.app.service('api/tests'),

    coverages: options.app.service('api/coverages'),

    logs: options.app.service('api/logs'),

    runner: function() {
      if (!this._runner) {
        this._runner = Runner(options);
      }
      return this._runner;
    },

    canInitialize: function() {
      return window.QUnit || (window.jasmine && window.jasmine.version_ && window.jasmine.version_.major === 1) ||
        (window.jasmine && window.jasmine.version && window.jasmine.version.split('.')[0] === '2') || (window.mocha && window.Mocha);
    },

    init: function() {
      var oldLog = window.console && window.console.log;
      var oldError = window.console && window.console.error;
      var self = this;

      if (window.QUnit) {
        this.initQUnit(window.QUnit);
      }

      if (window.jasmine && window.jasmine.version_ && window.jasmine.version_.major === 1) {
        this.initJasmine1(window.jasmine);
      }

      if (window.jasmine && window.jasmine.version && window.jasmine.version.split('.')[0] === '2') {
        this.initJasmine(window.jasmine);
      }

      if (window.mocha && window.Mocha) {
        this.initMocha(window.mocha);
      }

      if(typeof oldLog === 'function' && typeof oldError === 'function') {
        window.console.log = function() {
          self.runner().log('log', arguments);
          return oldLog.apply(this, arguments);
        };

        window.console.error = function() {
          self.runner().log('error', arguments);
          return oldError.apply(this, arguments);
        };
      }
    },

    initQUnit: function(QUnit) {
      setupQunit(QUnit, this.runner(), window);
    },

    initJasmine1: function(jasmine) {
      setupJasmine1(jasmine, this.runner(), window);
    },

    initJasmine: function(jasmine) {
      setupJasmine(jasmine, this.runner(), window);
    },

    initMocha: function(mocha) {
      setupMocha(mocha || window.mocha, this.runner(), window);
    },

    connect: new Promise(function(resolve) {
      var done = function() {
        // We need to add a timeout because PhantomJS for some reason
        // sends the api/runs::create event too soon
        _.delay(function() {
          resolve(options.socket);
        }, 250);
      };

      if (options.socket && !options.socket.connected) {
        options.socket.on('connect', done);
      } else {
        done();
      }
    })
  });

  if (options.canInitialize()) {
    options.init();
  }
});