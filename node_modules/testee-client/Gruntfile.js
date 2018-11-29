'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    qunit: {
      test: ['test/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.registerTask('default', [ 'qunit' ]);
};
