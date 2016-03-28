const env = {};

// session store
env.redis = {
    hostname: 'localhost',
    port: '6379'
};

// sprinklr api host addresses
env.sprinklr = {
    hostname: 'localhost',
    port: '8443',
    protocol: 'https:'
};

// sprinklr auth host addresses (this lives on UI as of this writing)
env.sprinklr_auth = {
    hostname: 'localhost',
    port: '8443',
    protocol: 'https:'
};

// app internal host
env.app = {
    hostname: 'localhost',
    port: '5000',
    protocol: 'http:'
};

// app public host
env.host = {
    hostname: 'localhost',
    port: '5000',
    protocol: 'http:'
};

export default env;
