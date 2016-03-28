import cp from 'child_process';

let serve = (gulp, plugins, options) => {
    return (callback) => {
        let started = false;

        let server = (function startup() {
            const child = cp.fork('./dist/server.js', {
                env: Object.assign({NODE_ENV: 'development'}, process.env)
            });

            child.once('message', (message) => {
                if (message.status.match(/^online$/)) {
                    if (!started) {
                        started = true;

                        setTimeout(() => {
                            plugins.util.log('The server is running at http://localhost:' + message.port);
                        }, 100);

                        if (options.watch) {
                            gulp.watch(options.paths.server, function() {
                                plugins.util.log('Restarting development server.');
                                server.kill('SIGTERM');
                                server = startup();
                            });
                        }

                        callback();
                    }
                }
            });

            return child;
        })();

        process.on('exit', () => server.kill('SIGTERM'));
    }
};

export default serve;
