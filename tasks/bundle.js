import  webpack from 'webpack';
import config from  '../webpack.config.js';

let bundle = (gulp, plugins, options) => {
    return callback => {
      let bundler = webpack(config);
        let bundlerRunCount = 0;

        function bundle (error, stats) {
            if (error) {
                throw new plugins.util.PluginError('webpack', error);
            }


            plugins.util.log(stats.toString({
                colors: plugins.util.colors.supportsColor,
                hash: options.verbose,
                version: options.verbose,
                timings: options.verbose,
                chunks: options.verbose,
                chunkModules: options.verbose,
                cached: options.verbose,
                cachedAssets: options.verbose,
                children: false
            }));

            if (++bundlerRunCount === (options.watch ? config.length : 1)) {
                return callback();
            }
        }

        if (options.watch) {
            bundler.watch(200, bundle);
        } else {
            bundler.run(bundle);
        }
    }
};

export default bundle;
