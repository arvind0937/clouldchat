import _ from 'lodash';


class AppsController {
    show(req, res, callback) {
        req.clients.appClient.show(req.params.id).catch((err) => {
            callback(err);
        }).then((app) => {
            res.json(app);
        });
    }

    create(req, res, callback) {
         AppClient( undefined,req).create(req.body).catch((err) => {
            callback(err);
        }).then((app) => {
            res.json(app);
        });
    }

    update(req, res, callback) {
         AppClient( undefined,req).update(req.body, req.params.id).catch((err) => {
            callback(err);
        }).then((app) => {
            res.json(app);
        });
    }

    delete(req, res, callback) {
         AppClient( undefined,req).delete(req.params.id).catch((err) => {
            callback(err);
        }).then(() => {
            res.sendStatus(202);
        });
    }
}

export default AppsController;
