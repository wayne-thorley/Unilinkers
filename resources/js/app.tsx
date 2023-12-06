import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HttpProvider } from './context';
import { config as routerConfig } from './router';

const router = createBrowserRouter( routerConfig );

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <HttpProvider>
            <RouterProvider router={ router } />
        </HttpProvider>
    </React.StrictMode>,
);
