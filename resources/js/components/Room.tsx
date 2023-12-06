import React from 'react';
import { Room as RoomType } from '../types/room';
import { useRoomApi } from '../hooks';
import Button from './Button';

type Props = RoomType & {
    onEdit: () => void;
    onDestroy: () => void;
};

function Room( {
    id, name, size, onEdit, onDestroy,
}: Props ): React.ReactElement {
    const { destroyRoom } = useRoomApi();

    const edit = () => {
        onEdit();
    };

    const destroy = () => {
        destroyRoom( { id } ).then( () => onDestroy() );
    };

    const styles = {
        wrapper: 'rounded bg-white p-3 flex items-center justify-between hover:shadow-xl transition-shadow duration-500',
        name: 'font-bold',
        size: 'text-sm',
    };

    return (
        <div className={ styles.wrapper }>
            <div>
                <h3 className={ styles.name }>{ name }</h3>
                <div className={ styles.size }>
                    { `Size: ${ size } (m2)` }
                </div>
            </div>
            <div>
                <Button onClick={ edit }>Edit</Button>
                &nbsp;
                <Button onClick={ destroy }>Delete</Button>
            </div>
        </div>
    );
}

export default Room;
