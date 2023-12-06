import React from 'react';
import routes from './routes';
import { Home, Property, Room } from '../pages';

const config = [
    {
        path: routes.home,
        element: <Home />,
    },
    {
        path: routes.property.list,
        element: <Property />,
    },
    {
        path: routes.room.list,
        element: <Room />,
    },
];

export default config;
