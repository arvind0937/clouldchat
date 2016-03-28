import del from 'del';

let clean = () => {
    return callback => {
        // del(['dist/*']);
        callback();
    };
};

export default clean;
