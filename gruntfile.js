module.exports = function(grunt) {
  
  var srcFiles = 'src/**/*.js';
  var specFiles = 'spec/**/*.js';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      build: {
        src: srcFiles,
      }
    },
    
    uglify: {
      build: {
        src: srcFiles,
        dest: 'build/all.min.js',
        options: {
          sourceMap: 'build/all.min.js.map'
        }
      }
    },
    mocha: {
      all: [srcFiles],
      test: {
          // Test files
          src: [specFiles],
          options: {
            // Bail means if a test fails, grunt will abort. False by default.
            bail: false,

            // Pipe output console.log from your JS to grunt. False by default.
            log: true,

            // mocha options
            mocha: {
              ignoreLeaks: false,
              grep: 'food'
            },

            // Select a Mocha reporter
            // http://visionmedia.github.com/mocha/#reporters
            reporter: 'Nyan',

            // Indicates whether 'mocha.run()' should be executed in
            // 'bridge.js'. If you include `mocha.run()` in your html spec,
            // check if environment is PhantomJS. See example/test/test2.html
            run: true,

            // Override the timeout of the test (default is 5000)
            timeout: 8000
          }
        }
    }
    ,
    
    watch: {
      build: {
        files: [srcFiles, specFiles],
        tasks: ['jshint', 'mocha', 'uglify']
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
 
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['jshint', 'mocha', 'uglify']);
};