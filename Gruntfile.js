module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        undef: true,
        //strict: true,
        //indent: true,
        indent: 2,
        latedef: true,
        newcap: true,
        browser: true,
        jquery: true
      },
      uses_defaults: ['client/scripts/*.js', 'server/*.js'],
      with_overrides: {
        options: {
          node: true,
          browser: false
        },
        files: {
          src: ['server/*.js']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    },
    // monitor the projects files
    watch: {
      all: {
        // Replace with whatever file you want to trigger the update from
        // Either as a String for a single entry
        // or an Array of String for multiple entries
        // You can use globing patterns like `css/**/*.css`
        // See https://github.com/gruntjs/grunt-contrib-watch#files
        files: ['client/index.html', 'client/styles/*.less', 'client/scripts/*.js'],
        options: {
          livereload: {
            port: 9001
          }
        }
      },
      less: {
        files: 'client/styles/*.less',
        tasks: 'less'
      }
    },
    less: {
      development: {
        files: {
          'client/styles/main.css': 'client/styles/*.less'
        }
      }
    },
    // open the url
    open: {
      all: {
        // Gets the port from the connect configuration
        //path: 'http://localhost:<%= connect.server.options.port%>'
        path: 'http://localhost:8000'
      }
    }
  });

  // load plugins.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-open');

  // creates tasks
  grunt.registerTask('server', ['open', 'watch']);

};