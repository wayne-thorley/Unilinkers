import React from 'react';
import routes from './routes';
import Home from '../pages/Home';
import Property from '../pages/Property';
import Room from '../pages/Room';

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
