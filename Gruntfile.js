module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // start a simple HTTP server
    connect: {
      server: {
        options: {
          port: 9000
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
        files: ['index.html', 'styles/*.less', 'scripts/*.js'],
        options: {
          livereload: {
            port: 9001
          }
        }
      },
      less: {
        files: 'styles/*.less',
        tasks: 'less'
      }
    },
    less: {
      development: {
        files: {
          'styles/main.css': 'styles/*.less'
        }
      }
    },
    // open the url
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.server.options.port%>'
      }
    }
  });

  // load plugins.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-open');

  // creates tasks
  grunt.registerTask('server', ['connect', 'open', 'watch']);

};