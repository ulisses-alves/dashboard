module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: 'build/'
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'source/',
            dest: 'build/',
            src: ['**']
          },
          {
            expand: true,
            cwd: 'vendor/',
            dest: 'build/vendor/',
            src: ['**']
          },
          {
            expand: true,
            cwd: 'tests/',
            dest: 'build/tests/',
            src: ['**']
          }
        ]
      }
    },
    coffee: {
      build: {
        options: {
          sourceMap: true
        },
        files: [
          {
            expand: true,
            cwd: 'build/scripts/',
            dest: 'build/scripts/',
            src: ['**/*.coffee'],
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'build/tests/',
            dest: 'build/tests/',
            src: ['**/*.coffee'],
            ext: '.js'
          }
        ]
      }
    },
    sass: {
      build: {
        files: [{
          expand: true,
          cwd: 'build/styles/',
          dest: 'build/styles/',
          src: ['**/*.sass', '**/*.scss'],
          ext: '.css'
        }]
      }
    },
    concat: {
      build: {
        options: {
          sourceMap: true
        },
        files: [{
          dest: 'build/scripts/dashboard.bundle.js',
          src: [
            'build/scripts/dashboard.js',
            'build/scripts/services/*.js',
            'build/scripts/controllers/*.js',
            'build/scripts/directives/*.js'
          ]
        }]
      }
    },
    uglify: {
      build: {
        options: {
          mangle: false,
          sourceMap: true,
          sourceMapIn: function(path) {
            return path + '.map'
          }
        },
        expand: true,
        cwd: 'build/',
        dest: 'build/',
        ext: '.bundle.min.js',
        src: ['**/*.bundle.js']
      }
    },
    autoprefixer: {
      build: {
        options: {
          map: true
        },
        expand: true,
        src: 'build/styles/**/*.css'
      }
    },
    csswring: {
      build: {
        options: {
          map: true
        },
        expand: true,
        cwd: 'build/styles/',
        dest: 'build/styles/',
        src: ['**/*.css', '!**/*.min.css'],
        ext: '.min.css'
      }
    },
    connect: {
      dev: {
        options: {
          port: 9000,
          base: {
            path: 'build/',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          browsers: ['PhantomJS'],
          singleRun: true,
          files: [
            'build/vendor/angular/angular.js',
            'build/vendor/angular/angular-route.js',
            'build/vendor/angular/angular-mocks.js',
            'build/scripts/dashboard.bundle.min.js',
            'build/tests/unit/**/*.js'
          ]
        }
      }
    },
    watch: {
      dev: {
        options: {
          spawn: false
        },
        files: ['source/**'],
        tasks: ['build']
      },
      test: {
        options: {
          spawn: false
        },
        files: [
          'source/**',
          'tests/**'
        ],
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csswring');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    'copy',
    'coffee',
    'sass',
    'concat',
    'uglify',
    'autoprefixer',
    'csswring'
  ]);

  grunt.registerTask('test', [
    'clean',
    'build',
    'karma:unit',
  ]);

  grunt.registerTask('dev', [
    'clean',
    'build',
    'connect',
    'watch:dev'
  ]);

  grunt.registerTask('devtest', [
    'test',
    'watch:test'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};
