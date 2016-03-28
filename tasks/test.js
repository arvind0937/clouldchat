let test = (gulp, plugins, options) => {
    return () => {
        let handleError = function (error) {
            plugins.util.log(error.toString());

            if (options.watch) {
                this.emit('end');
            }
        };

        return gulp.src(options.paths.tests, { read: false })
            .pipe(plugins.spawnMocha({
                reporter: 'mocha-better-spec-reporter',
                compilers: 'js:babel/register,.:test.compiler.js'
            }))
            .on('error', handleError);
    };
};

export default test;
