import React from 'react';
import routes from './routes';
import { Home, Property, Room } from '../pages';

const config = [
    {
        path: routes.home,
        element: <Home />,
    },
    {
        path: routes.property.index,
        element: <Property />,
    },
    {
        path: routes.room.index,
        element: <Room />,
    },
];

export default config;
