import ejs from 'gulp-ejs';
import url from 'url';

import env from '../config/environment.js';

const appHost = url.format({
    protocol: env.host.protocol,
    hostname: env.host.hostname,
    port: env.host.port
});

const sprinklrHost = url.format({
    protocol: env.sprinklr.protocol,
    hostname: env.sprinklr.hostname,
    port: env.sprinklr.port
});

const config = (gulp, plugins) => {
    return () => {
        gulp.src('./src/app/config.ejs')
            .pipe(ejs({
                appHost,
                sprinklrHost
            }, {
                ext: '.js'
            }))
            .pipe(gulp.dest('./src/api'))
            .pipe(gulp.dest('./src/app'));
    };
}

export default config;
