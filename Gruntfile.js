// Generated on 2015-03-25 using generator-nodes 0.5.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	var browserSync = require('browser-sync');

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		src: 'src',
		dist: 'dist',
		moduleName: grunt.file.readJSON('package.json').name
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: '/**\n' +
			' * <%= pkg.description %>\n' +
			' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * @link <%= pkg.homepage %>\n' +
			' * @author <%= pkg.author %>\n' +
			' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
			' */\n'
		},

		/*
			Watch tasks
		*/
		watch: {
			options: {
				spawn: false
			},
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep', 'bs-reload']
			},
			js: {
				files: ['<%= yeoman.src %>/**/*.js'],
				tasks: ['bs-reload']
			},
			html: {
				files: ['**/*.html'],
				tasks: ['bs-reload']
			},
			sass: {
				files: ['<%= yeoman.src %>/**/*.{scss,sass}'],
				tasks: ['sass:server', 'autoprefixer', 'bs-injectScss']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			}
		},

		/*
			SASS & CSS Tasks
		*/
		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},
		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourcemap: true
			},
			server: {
				files: {
					'.tmp/styles/<%= pkg.name %>.css': '<%= yeoman.src %>/<%= pkg.name %>.scss'
				}
			}
		},

		/*
			Javascript Tasks
		*/

		/*
			AngularJS Specific tasks
		 */
		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>',
					src: '**/*.js',
					dest: '.tmp/scripts'
				}]
			}
		},
		// Inline templates in Javascript to avoid async template loading
		ngtemplates: {
			dist: {
				cwd: '<%= yeoman.src %>',
				src: [
					'**/*.template.html'
				],
				dest: '.tmp/scripts/templates.js',
				options: {
					module: '<%= pkg.name %>',
					url: function(url) {
						return url.replace('dist/', '');
					},
					htmlmin: {
						collapseBooleanAttributes: false,
						collapseWhitespace: false,
						removeAttributeQuotes: false,
						removeComments: false, // Only if you don't use comment directives!
						removeEmptyAttributes: false,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: false,
						removeStyleLinkTypeAttributes: false
					}
				}
			}
		},

		/*
			Global Build Tasks
		*/
		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: [
					'.tmp/scripts/*.module.js',
					'.tmp/scripts/*.provider.js',
					'.tmp/scripts/*.factory.js'
				],
				dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
			}
		},
		copy: {
			dist: {
				files: [
					{
						cwd: '.tmp/styles',
						dot: true,
						src: '<%= pkg.name %>.css',
						dest: '<%= yeoman.dist %>/',
						expand: true,
						flatten: true
					},
					{
						src: '<%= yeoman.src %>/**/*.scss',
						dest: '<%= yeoman.dist %>/',
						dot: true,
						flatten: true,
						expand: true
					}
				]
			}
		},

		/*
			Global Utility Tasks
		*/
		// Automatically inject Bower components into the app
		wiredep: {
			options: {
				cwd: '',
				devDependencies: true
			},
			app: {
				src: ['index.html']
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},
		// Run some tasks in parallel to speed up the tasks processes
		concurrent: {
			server: [
				'sass:server'
			],
			dist: [
				'sass:server'
			]
		}
	});

	/*
		Command line tasks
	 */
	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'autoprefixer',
			'bs-connect',
			'watch'
		]);
	});

	grunt.registerTask('dist', 'Start a web server from the build folder', function() {
		// So far, the only way to keep the BS server running is to have it watch files...
		grunt.task.run(['bs-connectDist', 'watch']);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'ngAnnotate',
		'ngtemplates',
		'concurrent:dist',
		'autoprefixer:dist',
		'copy:dist',
		'concat'
	]);

	grunt.registerTask('default', [
		'build'
	]);

	grunt.registerTask('bs-connect', function () {
		browserSync({
			server: {
				baseDir: ['.', '.tmp'],
				routes: {
					'/bower_components': './bower_components'
				}
			}
		});
	});

	grunt.registerTask('bs-connectDist', function () {
		browserSync({
			server: {
				baseDir: ['/']
			}
		});
	});

	grunt.registerTask('bs-injectScss', function () {
		browserSync.reload(appConfig.moduleName + '.css');
	});

	grunt.registerTask('bs-reload', function () {
		browserSync.reload();
	});
};
