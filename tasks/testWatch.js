import runSequence from 'run-sequence';

let testWatch = (gulp, plugins, options) => {
    return callback => {
        options.watch = true;

        runSequence('test', () => {
            gulp.watch(options.paths.scripts, ['test']);
            callback();
        });
    };
};

export default testWatch;
