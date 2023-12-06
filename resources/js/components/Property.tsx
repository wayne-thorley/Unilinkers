import React from 'react';
import { Property as PropertyType } from '../types/property';
import { usePropertyApi } from '../hooks';
import Button from './Button';

type Props = PropertyType & {
    onEdit: () => void;
    onDestroy: () => void;
};

function Property( {
    id, name, address, onEdit, onDestroy,
}: Props ): React.ReactElement {
    const { destroyProperty } = usePropertyApi();

    const edit = () => {
        onEdit();
    };

    const destroy = () => {
        destroyProperty( { id } ).then( () => onDestroy() );
    };

    const styles = {
        wrapper: 'rounded overflow-hidden hover:shadow-xl transition-shadow duration-500',
        figure: 'bg-gray-200 rounded-t aspect-video',
        image: 'w-full h-full object-cover',
        body: 'bg-white p-3 rounded-b',
        name: 'font-bold',
        address: 'mt-2 text-sm',
        actions: 'mt-2 flex items-center',
    };

    return (
        <div className={ styles.wrapper }>
            <figure className={ styles.figure }>
                <img className={ styles.image } alt="" />
            </figure>
            <div className={ styles.body }>
                <h3 className={ styles.name }>{ name }</h3>
                <div className={ styles.address }>{ address }</div>
                <div className={ styles.actions }>
                    <Button onClick={ edit }>Edit</Button>
                    &nbsp;
                    <Button onClick={ destroy }>Delete</Button>
                </div>
            </div>
        </div>
    );
}

export default Property;
