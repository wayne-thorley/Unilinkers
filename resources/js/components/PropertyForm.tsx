import React from 'react';
import { Property as PropertyType } from '../types/property';
import { useInputValue, usePropertyApi } from '../hooks';
import Button from './Button';
import Input from './Input';

type Props = {
    property: PropertyType | Record<string, never>;
    onPersist: ( property: PropertyType ) => void;
};

function PropertyForm( { property, onPersist }: Props ): React.ReactElement {
    const name = useInputValue( 'name', property.name || '' );
    const address = useInputValue( 'address', property.address || '' );

    const { updateProperty, storeProperty } = usePropertyApi();

    const parseErrors = ( errors: { [ key: string ]: string } ) => {
        [ name, address ].forEach( field => field.parseErrors( errors ) );
    };

    const persist = () => {
        if ( property.id ) {
            updateProperty( {
                id: property.id,
                name: name.value,
                address: address.value,
            } )
                .then( ( { data } ) => onPersist( data.data ) )
                .catch( error => parseErrors( error.response?.data?.errors ) );
        } else {
            storeProperty( {
                name: name.value,
                address: address.value,
            } )
                .then( ( { data } ) => onPersist( data.data ) )
                .catch( error => parseErrors( error.response?.data?.errors ) );
        }
    };

    return (
        <form>
            <Input type="text" label="Name" { ...name.bind } />
            <Input type="text" label="Address" { ...address.bind } />
            <Button onClick={ persist }>
                { property.id ? 'Update' : 'Store' }
            </Button>
        </form>
    );
}

export default PropertyForm;
