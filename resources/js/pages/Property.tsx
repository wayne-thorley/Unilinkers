import React, { useEffect, useState } from 'react';
import { usePropertyApi } from '../hooks';
import { Page } from '../layout';
import { Property as PropertyType } from '../types/property';

function Property(): React.ReactElement {
    const [ properties, setProperties ] = useState<PropertyType[]>( [] );
    
    const { listProperty } = usePropertyApi();

    useEffect( () => {
        listProperty().then( ( { data } ) => {
            setProperties( data.data );
        } );
    }, [] );
    
    return (
        <Page title="Property">
            <div className="container">
                <h1 className="text-2xl font-bold">Property</h1>
                { properties.map( property => (
                    <div key={ property.id }>
                        { property.name }
                    </div>
                ) ) }
            </div>
        </Page>
    );
}

export default Property;
