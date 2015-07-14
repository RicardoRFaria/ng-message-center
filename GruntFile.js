module.exports = function (grunt) {

    grunt.initConfig({

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n'
            },
            dist: {
                // the files to concatenate
                src: ['src/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/ng-message-center.js' //<%= pkg.name %>
            }
        },
		
		uglify: {
			dist: {
			  files: {
				'dist/ng-message-center.min.js': ['src/**/*.js']
				}
			}
		},

        jshint: {
            all: ['src/js/**.js'],

            options: {
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'report/jshint/index.html',
                force: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                maxcomplexity: true,
                unused: true,
                globals: {
                    jQuery: true
                }
            }
        },

        clean: ["report", "dist"]

    });

    
    grunt.registerTask('test', ['clean', 'jshint']);
    grunt.registerTask('release', ['test','concat', 'uglify']);
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};


