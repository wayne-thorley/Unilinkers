import React from 'react';
import { Page } from '../layout';

function Home(): React.ReactElement {
    return (
        <Page>
            <div className="container my-6 flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    { `Welcome to ${ import.meta.env.VITE_APP_NAME }` }
                </h1>
                <p className="mt-2">
                    Use the links in the navigation to visit the Property &amp; Room pages
                </p>
            </div>
        </Page>
    );
}

export default Home;
