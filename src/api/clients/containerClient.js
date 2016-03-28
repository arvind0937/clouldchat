import _ from 'lodash';

export default (app, req) => {
    class ContainerClient {
        index(projectId) {
            const pathname = `/projects/${projectId}/containers`;
            return req.dataloader.get(pathname);
        }

        show(id) {
            const pathname = `/containers/${id}`;
            return req.dataloader.get(pathname);
        }

        // 'private' method
        createContainer(attributes) {
            const pathname = '/containers';

            attributes = _.extend({
                name: 'UntitledContainer',
                projectId: null,
                type: 'PAGE',
                settings: {
                    title: 'Default',
                    path: 'untitledPath',
                    javascriptUrls: [],
                    stylesheetUrls: [],
                    meta: {}
                }
            }, attributes);

            return req.dataloader.post(pathname, { body: attributes });
        }

        create(attributes) {
            return this.createContainer(attributes).then((container) => {
                const resource = {
                    containerId: container.containerId,
                    projectId: container.projectId,
                    templateType: attributes.templateType
                };

                if (container.type === 'FRAGMENT') {
                    resource.name = container.name;
                }

                return req.clients.resourceClient
                    .create(resource)
                    .then(() => container);
            });
        }

        update(container) {
            const pathname = `/containers/${container.containerId}`;
            return req.dataloader.put(pathname, { body: container });
        }

        delete(containerId) {
            const pathname = `/containers/${containerId}`;
            return req.dataloader.delete(pathname);
        }

        // FIXME - this no longer works since the migration to the core API
        //         we will need new endpoints for this
        import(container) {
            console.log(container);
        }
    }

    return new ContainerClient();
};
