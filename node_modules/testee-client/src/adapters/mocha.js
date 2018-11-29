var _ = {
  extend: require('lodash/assign'),
  noop: require('lodash/noop'),
  each: require('lodash/each'),
  bind: require('lodash/bind'),
  indexOf: require('lodash/indexOf'),
  clone: require('lodash/clone')
};
var guid = require('./../guid');

function TesteeReporter(runner) {
  var self = this;
  var methodMappings = {
    'test end': 'testEnd',
    'suite end': 'suiteEnd'
  };
  var pipe = function(type, converter) {
    runner.on(type, function() {
      var data = converter.apply(converter, arguments);
      var method = methodMappings[type] || type;
      self.api[method](data);
    });
  };

  this.originalReporter = new this.OldReporter(runner);
  this.ids = [];
  this.uuids = {};
  this.last = {};
  this.total = 0;
  this.pending = 0;
  this.failed = 0;
  this.runId = guid();

  pipe('start', function() {
    return {
      environment: navigator.userAgent,
      runner: 'Mocha',
      time: new Date().getTime(),
      id: self.runId
    };
  });

  pipe('fail', function(data, err) {
    var diff;
    // Note: this is a workaround until https://github.com/bitovi/testee-client/pull/43
    //  can be merged.  The associated server PR https://github.com/bitovi/testee/pull/163
    //  currently is failing to pass the tests, so #43 cannot be merged. Once that is working
    //  working, this change should be reverted. --BM 2018-06-06
    var title = data.title;
    if(data && data.type === "hook") {
      if(data.ctx.currentTest) {
        data = data.ctx.currentTest;
      } else if(data.title === '"before all" hook') {
        // tests in this suite will never run if before() fails,
        //  so create the first test in order to fail it.
        var test;
        data.parent.eachTest(function(t) {
          test = test || t;
        })
        data = test || data;
        diff = self.diff(data);
        self.api['test'](diff);
      } else {
        // after all hook.  apply to last test, which has already ran
        data.parent.eachTest(function(t) {
          data = t;
        })
      }
    }

    diff = self.diff(data);
    diff.err = {
      message: err.message,
      stack: err.stack || ''
    };
    diff.title = title;
    return diff;
  });

  pipe('end', function(data) {
    var diff = self.diff(data);

    diff.id = self.runId;
    diff.total = self.total;
    diff.failed = self.failed;
    diff.pending = self.pending;
    diff.passed = self.total - self.failed - self.pending;

    return diff;
  });

  pipe('suite', function(data) {
    var diff = self.diff(data);
    if (data.root) {
      diff.parent = self.runId;
    }

    return diff;
  });

  _.each(['suite end', 'pending', 'test', 'test end', 'pass'], function(name) {
    pipe(name, _.bind(self.diff, self));
  });

  runner.on('pending', function() {
    self.pending++;
    self.total++;
  });

  runner.on('fail', function() {
    self.failed++;
    self.total++;
  });

  runner.on('pass', function() {
    self.total++;
  });
}

TesteeReporter.prototype.objectify = function(data) {
  var result = {};
  var self = this;

  _.each(data, function(value, key) {
    var isPrivate = key.indexOf('_') === 0 || key.indexOf('$') === 0;
    if (typeof value === 'object' && !isPrivate) {
      var idx = _.indexOf(self.ids, value);
      if (!!~idx) {
        result[key] = self.uuids[idx];
      }
    } else if (typeof value !== 'function' && !isPrivate && value !== undefined) {
      result[key] = value;
    }
  });
  return result;
};

TesteeReporter.prototype.diff = function(obj) {
  var self = this;
  var current = self.objectify(obj);
  var result = {};
  var idx = _.indexOf(self.ids, obj);

  if (!~idx) {
    idx = self.ids.push(obj) - 1;
    self.uuids[idx] = guid();
    result = _.clone(current || {});
  } else {
    _.each(current, function(value, key) {
      if (self.last[idx][key] !== value) {
        result[key] = value;
      }
    });
  }

  self.last[idx] = current;
  result.id = self.uuids[idx];

  return result;
};

module.exports = function(mocha, api) {
  TesteeReporter.prototype.api = api;
  TesteeReporter.prototype.OldReporter = mocha._reporter;
  mocha.reporter(TesteeReporter);
};

module.exports.Reporter = TesteeReporter;