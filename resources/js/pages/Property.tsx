import React, { useEffect, useState } from 'react';
import { usePropertyApi } from '../hooks';
import Page from '../layout/Page';
import { Property as PropertyType } from '../types/property';
import {
    Button, Modal, Property as PropertyComponent, PropertyForm,
} from '../components';

function Property(): React.ReactElement {
    const [ properties, setProperties ] = useState<PropertyType[]>( [] );
    const [ showFormModal, setShowFormModal ] = useState( false );
    /* eslint-disable-next-line max-len */
    const [ editingProperty, setEditingProperty ] = useState<PropertyType | Record<string, never>>( {} );
    
    const { listProperty } = usePropertyApi();

    const editProperty = ( property: PropertyType ) => {
        setEditingProperty( property );
        setShowFormModal( true );
    };

    const updateProperty = ( property: PropertyType ) => {
        const foundIndex = properties.findIndex( p => p.id === property.id );

        let newProperties = [ ...properties ];

        if ( foundIndex === -1 ) {
            newProperties = newProperties.concat( property );
        } else {
            newProperties[ foundIndex ] = property;
        }

        setProperties( newProperties );
        setShowFormModal( false );
    };

    const createProperty = () => {
        setEditingProperty( {} );
        setShowFormModal( true );
    };

    const removeProperty = ( property: PropertyType ) => {
        setProperties( properties.filter( p => p.id !== property.id ) );
    };

    useEffect( () => {
        listProperty().then( ( { data } ) => {
            setProperties( data.data );
        } );
    }, [] );

    return (
        <Page title="Property">
            <div className="container my-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Property</h1>
                    <Button onClick={ createProperty }>Add Property</Button>
                </div>
                <div className="flex flex-wrap -mx-2 mt-2">
                    { properties.map( property => (
                        <div key={ property.id } className="w-1/3 px-2 mb-4">
                            <PropertyComponent
                                { ...property }
                                onEdit={ () => editProperty( property ) }
                                onDestroy={ () => removeProperty( property ) } />
                        </div>
                    ) ) }
                </div>
            </div>

            <Modal isOpen={ showFormModal } onClose={ () => setShowFormModal( false ) }>
                <PropertyForm property={ editingProperty } onPersist={ updateProperty } />
            </Modal>
        </Page>
    );
}

export default Property;
