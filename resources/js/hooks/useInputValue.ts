import { useState, useCallback } from 'react';

function useInputValue( name: string, initialValue: string ) {
    const [ value, setValue ] = useState( initialValue );
    const [ error, setError ] = useState( '' );

    const onChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setValue( e.target.value );
        setError( '' );
    }, [] );

    const parseErrors = ( errors: { [ key: string ]: string } ) => {
        if ( errors ) {
            const match = Object.keys( errors ).find( prop => prop === name || prop.startsWith( `${ name }.` ) );
            setError( match ? errors[ match ][ 0 ] : '' );
        }
    };

    const reset = () => {
        setValue( initialValue );
        setError( '' );
    };

    return {
        name,
        value,
        setValue,
        reset,
        parseErrors,
        bind: {
            value,
            onChange,
            error,
        },
    };
}

export default useInputValue;
