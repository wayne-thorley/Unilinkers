import React from 'react';

function Footer(): React.ReactElement {
    const styles = {
        wrapper: 'bg-white py-3 text-xs',
        container: 'container text-center',
    };

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.container }>
                Copyright
                { ' ' }
                &copy;
                { ' ' }
                { ( new Date() ).getFullYear() }
                { '. ' }
                All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
