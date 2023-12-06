import React, { useEffect, useState } from 'react';
import { useRoomApi } from '../hooks';
import { Page } from '../layout';
import { Room as RoomType } from '../types/room';

function Room(): React.ReactElement {
    const [ rooms, setRooms ] = useState<RoomType[]>( [] );

    const { listRoom } = useRoomApi();

    useEffect( () => {
        listRoom( { property_id: '0' } ).then( ( { data } ) => {
            setRooms( data.data );
        } );
    }, [] );

    return (
        <Page title="Room">
            <div className="container">
                <h1 className="text-2xl font-bold">Room</h1>
                { rooms.map( room => (
                    <div key={ room.id }>
                        { room.name }
                    </div>
                ) ) }
            </div>
        </Page>
    );
}

export default Room;
