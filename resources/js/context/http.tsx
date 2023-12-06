import React, { createContext, useContext, useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';

type Value = {
    http: AxiosInstance;
} | undefined;

type Props = {
    children: React.ReactNode;
};

const HttpContext = createContext<Value>( undefined );

function HttpProvider( { children }: Props ): React.ReactNode {
    const value = useMemo( () => {
        const http = axios.create( {
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        } );

        return { http };
    }, [] );

    return (
        <HttpContext.Provider value={ value }>
            { children }
        </HttpContext.Provider>
    );
}

function useHttp() {
    const context = useContext( HttpContext );

    if ( context === undefined ) {
        throw new Error( 'useHttp must be used within a HttpProvider' );
    }

    return context;
}

export { HttpProvider, useHttp };
