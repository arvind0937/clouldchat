let assets = (gulp, plugins, options) => {
    return callback => {

         gulp.src(options.paths.assets)
            .pipe(plugins.changed('dist/public'))
            .pipe(gulp.dest('dist/public'));

            callback();
    };
};

export default assets;
