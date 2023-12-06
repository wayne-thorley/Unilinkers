import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePropertyApi, useRoomApi } from '../hooks';
import Page from '../layout/Page';
import { Property as PropertyType } from '../types/property';
import { Room as RoomType } from '../types/room';
import {
    Button, Modal, Room as RoomComponent, RoomForm,
} from '../components';

function Room(): React.ReactElement {
    const [ searchParams, setSearchParams ] = useSearchParams();

    const [ properties, setProperties ] = useState<PropertyType[]>( [] );
    const [ propertyId, setPropertyId ] = useState<string | undefined>( searchParams.get( 'property_id' ) || undefined );
    const [ rooms, setRooms ] = useState<RoomType[]>( [] );
    const [ showFormModal, setShowFormModal ] = useState( false );
    const [ editingRoom, setEditingRoom ] = useState<RoomType | Record<string, never>>( {} );

    const { listProperty } = usePropertyApi();
    const { listRoom } = useRoomApi();

    const editRoom = ( room: RoomType ) => {
        setEditingRoom( room );
        setShowFormModal( true );
    };

    const updateRoom = ( room: RoomType ) => {
        const foundIndex = rooms.findIndex( r => r.id === room.id );

        let newRooms = [ ...rooms ];

        if ( foundIndex === -1 ) {
            newRooms = newRooms.concat( room );
        } else {
            newRooms[ foundIndex ] = room;
        }

        setRooms( newRooms );
        setShowFormModal( false );
    };

    const createRoom = () => {
        setEditingRoom( {} );
        setShowFormModal( true );
    };

    const removeRoom = ( room: RoomType ) => {
        setRooms( rooms.filter( r => r.id !== room.id ) );
    };

    useEffect( () => {
        listProperty().then( ( { data } ) => {
            setProperties( data.data );
        } );
    }, [] );

    useEffect( () => {
        if ( propertyId ) {
            listRoom( { property_id: propertyId } ).then( ( { data } ) => {
                setRooms( data.data );
            } );
            setSearchParams( { property_id: propertyId } );
        } else {
            setRooms( [] );
            setSearchParams( {} );
        }
    }, [ propertyId ] );

    return (
        <Page title="Room">
            <div className="container my-6">
                <h1 className="text-2xl font-bold">Room</h1>

                <div className="mt-2 mb-6">
                    <div className="text-xs font-bold mb-1">Property</div>
                    <div className="flex">
                        <select
                            value={ propertyId || '' }
                            onChange={ e => setPropertyId( e.target.value ) }
                            className="rounded p-2 border border-gray-200 focus:outline-none">
                            <option value="">Select property...</option>
                            { properties.map( p => (
                                <option key={ p.id } value={ p.id }>
                                    { p.name }
                                </option>
                            ) ) }
                        </select>
                        { propertyId && (
                            <Button onClick={ createRoom }>Add Room</Button>
                        ) }
                    </div>
                </div>

                { rooms.map( room => (
                    <div key={ room.id } className="mb-4">
                        <RoomComponent
                            { ...room }
                            onEdit={ () => editRoom( room ) }
                            onDestroy={ () => removeRoom( room ) } />
                    </div>
                ) ) }
            </div>

            <Modal isOpen={ showFormModal } onClose={ () => setShowFormModal( false ) }>
                <RoomForm room={ editingRoom } propertyId={ propertyId } onPersist={ updateRoom } />
            </Modal>
        </Page>
    );
}

export default Room;
