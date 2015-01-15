module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 9000,
          keepalive: true,
          base: {
            path: 'source/',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);
};
