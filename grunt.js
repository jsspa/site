/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        node: true,
        laxcomma: true,
        asi: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  grunt.registerTask('update', 'updates submodules', function (){
    var done = this.async();
    grunt.log.writeln('Actualizando submodulos');
    grunt.utils.spawn({
      cmd:'/usr/bin/git',
      args: ['submodule', 'foreach', 'git', 'pull', 'origin', 'master']
    }, function (err, output){
      if (err) throw err;
      grunt.log.writelns(output.stdout);
      done();
    });
  });
  // Default task.
  grunt.registerTask('default', 'concat min');

};
