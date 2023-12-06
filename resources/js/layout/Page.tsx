import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

type Props = {
    title?: string;
    children?: React.ReactNode;
};

function Page( { title, children }: Props ): React.ReactElement {
    useEffect( () => {
        document.title = `${ title ? `${ title } | ` : '' }${ import.meta.env.VITE_APP_NAME }`;
    }, [ title ] );

    return (
        <>
            <Header />
            <Main>
                { children }
            </Main>
            <Footer />
        </>
    );
}

Page.defaultProps = {
    title: '',
    children: null,
};

export default Page;
