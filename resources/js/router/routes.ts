const routes = {
    home: '/',
    property: {
        list: '/property',
        store: '/property',
        show: '/property/:id',
        update: '/property/:id',
        delete: '/property/:id',
    },
    room: {
        list: '/room',
        store: '/room',
        show: '/room/:id',
        update: '/room/:id',
        delete: '/room/:id',
    },
};

export default routes;
