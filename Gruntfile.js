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
          }
        ]
      }
    },
    coffee: {
      build: {
        options: {
          sourceMap: true
        },
        expand: true,
        cwd: 'build/scripts/',
        dest: 'build/scripts/',
        src: ['**/*.coffee'],
        ext: '.js'
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
    watch: {
      dev: {
        options: {
          spawn: false
        },
        files: ['source/**/*'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csswring');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', [
    'copy',
    'coffee',
    'sass',
    'concat',
    'uglify',
    'csswring'
  ]);

  grunt.registerTask('dev', [
    'clean',
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};
