import _ from 'lodash';
import Dataloader from 'dataloader';
import superagent from 'superagent';
import url from 'url';

export default (app, req) => {
    function formatUrl(pathname) {
        const config = req.config.sprinklr;

        return url.format({
            protocol: config.protocol,
            hostname: config.hostname,
            pathname: `/api/micro/service/xb${pathname}`,
            port: config.port
        });
    }

    function request(pathname, method = 'get', options = {}) {
        return new Promise((resolve, reject) => {

            if (!pathname) {
                return reject(new Error('A pathname is required to make a request.'));
            }

            const url = formatUrl(pathname);

            const headers = _.defaults({}, options.headers, {
                'Content-Type': 'application/json',
                // 'X-SPR-Authorization': `Bearer ${req.session.accessToken.text}`,
                'Cookie': req.headers.cookie
            });

            const request = superagent[method](url).set(headers);

            if (options.body) {
                request.send(options.body);
            }

            request.end((err, res) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res.body);
            });
        });
    }

    const dataloader = new Dataloader((args) => {
        // NOTE: Only to be used by GET requests
        return Promise.all(args.map((args) => request(args.pathname, 'get', args.options)));
    });

    return {
        delete(pathname, options = {}) {
            return request(pathname, 'delete', options);
        },

        get(pathname, options = {}) {
            // Cache all GET request made in a single Express.js request
            return dataloader.load({ pathname, options });
            // return request(pathname);
        },

        head(pathname, options = {}) {
            return request(pathname, 'head', options);
        },

        post(pathname, options = {}) {
            return request(pathname, 'post', options);
        },

        put(pathname, options = {}) {
            return request(pathname, 'put', options);
        }
    };
};
