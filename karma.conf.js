// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
 
module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',
 
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
 
    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/**/*.js'

    ],
 
 
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
 
 
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    // add to list of preprocessors
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    

    // add plugin settings
    coverageReporter: {
      // type of file to output, use text to output to console
      type: 'html',
      // directory where coverage results are saved
      dir: 'report/',
      subdir: function (browser) {
        return 'coverage/';
      },
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    continuous: {
      singleRun: true,
      browsers: ['PhantomJS']
    }
  });
};