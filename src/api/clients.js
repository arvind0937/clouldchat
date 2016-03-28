import appClient from './clients/appClient';
import containerClient from './clients/containerClient';

export default (app, req) => {
    return {
        // Client instances:
        appClient: appClient(app, req),
        containerClient: containerClient(app, req)
    };
};
