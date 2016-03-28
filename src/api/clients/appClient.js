import _ from 'lodash';
import ContainerClient from './containerClient';

export default (app, req) => {
    class AppClient {


    show(id) {
      return req.dataloader.get('/ui/rest/user/status');
    }

    create(attributes) {
        let containerClient = new ContainerClient(this.db);

        attributes = _.extend({
            id: null,
            projectId: null,
            slug: null,
            settings: {}
        }, attributes);

        return new Promise((resolve, reject) => {
            this.collection.insert(attributes).catch((err) => {
                reject(err);
            }).then((app) => {
                containerClient.create({ appId: app.ops[0].id }).catch((err) => {
                    reject(err);
                }).then((container) => {
                    resolve(_.merge(app.ops[0], {
                        container: container
                    }));
                });
            });
        });
    }

    update(attributes, id) {
        return new Promise((resolve, reject) => {
            delete attributes._id; // eslint-disable-line no-underscore-dangle

            this.collection.findOneAndUpdate({ id: id }, { $set: attributes }, { returnOriginal: false }).catch((err) => {
                reject(err);
            }).then((app) => {
                resolve(app.value);
            });
        });
    }

    delete(id) {
        let containerClient = new ContainerClient(this.db);

        return new Promise((resolve, reject) => {
            containerClient.index(id).catch((err) => {
                reject(err);
            }).then((containers) => {
                _.each(containers, (container) => containerClient.delete(container.id));
            });

            this.collection.deleteOne({ id: id }).catch((err) => {
                reject(err);
            }).then(() => {
                resolve();
            });
        });
    }

    import(app) {
        app = _.omit(app, '_id');
        return this.collection.insert(app);
    }
  }

  return new AppClient();

};
