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
    const name = useInputValue( 'name', property.name );
    const address = useInputValue( 'address', property.address );

    const { updateProperty, storeProperty } = usePropertyApi();

    const persist = () => {
        if ( property ) {
            updateProperty( {
                id: property.id,
                name: name.value,
                address: address.value,
            } ).then( ( { data } ) => onPersist( data.data ) );
        } else {
            storeProperty( {
                name: name.value,
                address: address.value,
            } ).then( ( { data } ) => onPersist( data.data ) );
        }
    };

    return (
        <form>
            <Input type="text" label="Name" { ...name.bind } />
            <Input type="text" label="Address" { ...address.bind } />
            <Button onClick={ persist }>
                { property ? 'Update' : 'Store' }
            </Button>
        </form>
    );
}

export default PropertyForm;
