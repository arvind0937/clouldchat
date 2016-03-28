import runSequence  from 'run-sequence';

let build = () => {
  return callback => {
        runSequence('assets', 'config' ,'bundle', callback);
    };
};

export default build;
