module.exports = function (grunt) {

    'use strict';

    // Load Grunt tasks automatically
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.initConfig({

        // ---------------------------------------------------------------------
        // | Project Settings                                                  |
        // ---------------------------------------------------------------------

        settings: {

            // Configurable paths
            dir: {
                src: 'src',
                dist: 'dist'
            },

            // Configurable file names
            archive: 'h5bp-dist.zip',

            // Metadata
            pkg: grunt.file.readJSON('package.json'),
            banner: '/*! HTML5 Boilerplate v<%= settings.pkg.version %>' +
                        ' | <%= settings.pkg.license.type %> License' +
                        ' | <%= settings.pkg.homepage %> */\n'

        },

        // ---------------------------------------------------------------------
        // | Tasks Configurations                                              |
        // ---------------------------------------------------------------------

        clean: {
            // List of files that should be removed
            // before the build process is started
            all: [ 'dist' ]
        },

        compress: {
            build: {

                files: [{
                    src: '<%= settings.dir.dist %>/**'
                }],

                // Available options:
                // https://github.com/gruntjs/grunt-contrib-compress#options
                options: {
                    archive: '<%= settings.archive %>',
                    mode: 'zip'
                }

            }
        },

        copy: {
            build: {
                files: [

                    // Copy HTML5 Boilerplate core files + Modernizr
                    {
                        cwd: '<%= settings.dir.src %>/',
                        dest: '<%= settings.dir.dist %>/',
                        dot: true,
                        expand: true,
                        src: [
                            // Copy all files
                            '**',
                        ]
                    },

                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

                    // Copy normalize.css

                    {
                        expand: true,
                        cwd: 'node_modules/normalize.css/',
                        dest: '<%= settings.dir.dist %>/css/',
                        src: 'normalize.css'
                    },

                    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

                    // Copy jQuery

                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist',
                        dest: '<%= settings.dir.dist %>/js/vendor/',
                        src: 'jquery.min.js',
                        rename: function (dest, src) {
                            return dest + src.replace('.min', '-<%= settings.pkg.devDependencies.jquery %>.min');
                        }
                    }

                ]
            }
        },

        sed: {
            version: {
                path: '<%= settings.dir.dist %>/index.html',
                pattern: '{{JQUERY_VERSION}}',
                replacement: '<%= settings.pkg.devDependencies.jquery %>',
                recursive: true
            }
        },

        usebanner: {

            files: {
                src: '<%= settings.dir.dist %>/css/main.css',
            },

            // Available options:
            // https://github.com/mattstyles/grunt-banner#options
            options: {
                banner: '<%= settings.banner %>',
                linebreak: true,
                position: 'top'
            }

        }

    });

    // -------------------------------------------------------------------------
    // | Main Tasks                                                            |
    // -------------------------------------------------------------------------

    grunt.registerTask('build', [
        'clean',
        'copy',
        'usebanner',
        'sed'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('release', [
        'build',
        'compress'
    ]);

};
