import React from 'react';
import { Room as RoomType } from '../types/room';
import { useInputValue, useRoomApi } from '../hooks';
import Button from './Button';
import Input from './Input';

type Props = {
    room: RoomType | Record<string, never>;
    propertyId?: string;
    onPersist: ( room: RoomType ) => void;
};

function RoomForm( { room, propertyId = '', onPersist }: Props ): React.ReactElement {
    const name = useInputValue( 'name', room.name || '' );
    const size = useInputValue( 'size', room.size || '' );

    const { updateRoom, storeRoom } = useRoomApi();

    const parseErrors = ( errors: { [ key: string ]: string } ) => {
        [ name, size ].forEach( field => field.parseErrors( errors ) );
    };

    const persist = () => {
        if ( room.id ) {
            updateRoom( {
                id: room.id,
                name: name.value,
                size: size.value,
            } )
                .then( ( { data } ) => onPersist( data.data ) )
                .catch( error => parseErrors( error.response?.data?.errors ) );
        } else {
            storeRoom( {
                property_id: propertyId,
                name: name.value,
                size: size.value,
            } )
                .then( ( { data } ) => onPersist( data.data ) )
                .catch( error => parseErrors( error.response?.data?.errors ) );
        }
    };

    return (
        <form>
            <Input type="text" label="Name" { ...name.bind } />
            <Input type="number" step="0.01" label="Size" { ...size.bind } />
            <Button onClick={ persist }>
                { room.id ? 'Update' : 'Store' }
            </Button>
        </form>
    );
}

RoomForm.defaultProps = { propertyId: undefined };

export default RoomForm;
