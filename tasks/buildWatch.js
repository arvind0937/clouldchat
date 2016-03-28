import runSequence from 'run-sequence';

let buildWatch = (gulp, plugins, options) => {

  return callback => {
        options.watch = true;

        runSequence('build', () => {
          gulp.watch(options.paths.assets, ['assets']);
            callback();
        });
    };
};

export default buildWatch;
