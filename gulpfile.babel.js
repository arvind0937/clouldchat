import gulp from 'gulp';
import minimist from 'minimist';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const argv = minimist(process.argv.slice(2));

let options = {
    verbose: !!argv.verbose,
    watch: !!argv.watch,
    paths: {
        assets: [
          './package.json',
             './src/public/**/*.*',
             './src/**/index.html',
             './src/**/*.svg'
      ],
      server: [
        'dist/server.js'
      ],
      // tests: [
      //   'test.helper.js',
      //   'src/**/*.test.js'
      // ],
      scripts: [
        'src/**/*.js'
      ]
    }
};

/**
 * Gets a task from a module in the tasks directory.
 * @function
 * @param {string} moduleName - The filename of the module containing the task you wish to call
 * @param {string} taskName - The named export function you wish to call as a task.
 *         If no task is provided, it will use the default export of the module.
 */
let getTask = (moduleName, taskName) => {
    let module = require('./tasks/' + moduleName),
        task = taskName ? module[taskName] : module;

    return task(gulp, plugins, options);
};



gulp.task('clean', getTask('clean'));
gulp.task('assets', getTask('assets'));
gulp.task('bundle', getTask('bundle'));
gulp.task('build', ['clean'], getTask('build'));
gulp.task('build:watch', getTask('buildWatch'));
gulp.task('config', getTask('config'));
gulp.task('test', getTask('test'));
gulp.task('test:watch', getTask('testWatch'));
gulp.task('test:ci', getTask('testCI'));
gulp.task('dev', ['build'], getTask('dev'));
gulp.task('dev:watch', ['build:watch'], getTask('dev'));
gulp.task('init', getTask('dev'))

gulp.task('default', function(){
  console.log('test');
});
