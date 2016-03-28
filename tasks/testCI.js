let test = (gulp, plugins, options) => {
    return () => {
        let handleError = function (error) {
            plugins.util.log(error.toString());
            process.exit(1);
        };

        let handleEnd = function () {
            process.exit();
        };

        return gulp.src(options.paths.tests, { read: false })
            .pipe(plugins.spawnMocha({
                reporter: 'xunit-file',
                compilers: 'js:babel/register,.:test.compiler.js'
            }))
            .on('error', handleError)
            .on('end', handleEnd);
    };
};

export default test;
