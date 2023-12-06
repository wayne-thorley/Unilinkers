/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function Modal( { isOpen, onClose, children }: Props ): React.ReactPortal | undefined {
    const [ isMounted, setIsMounted ] = useState( false );

    const onEsc = ( e: KeyboardEvent ) => {
        if ( e.key === 'Esc' || e.key === 'Escape' ) {
            onClose();
        }
    };

    useEffect( () => {
        setIsMounted( true );

        document.addEventListener( 'keydown', onEsc );
        
        return () => {
            document.removeEventListener( 'keydown', onEsc );
        };
    }, [] );

    const styles = {
        wrapper: 'fixed inset-0 z-50 bg-black bg-opacity-75 flex items-end sm:items-center sm:justify-center',
        inner: 'w-full sm:max-w-xl max-h-screen overflow-y-auto p-6 bg-white shadow-xl rounded-t-lg sm:rounded-lg',
    };

    const component = (
        <div className={ styles.wrapper } onClick={ onClose }>
            <div className={ styles.inner } onClick={ e => e.stopPropagation() }>
                { children }
            </div>
        </div>
    );

    return isMounted && isOpen ? createPortal( component, document.body ) : undefined;
}

export default Modal;
