import React from 'react';

type Props = {
    children: React.ReactNode;
};

function Main( { children }: Props ): React.ReactElement {
    const styles = { wrapper: 'flex-grow flex flex-col' };

    return (
        <div className={ styles.wrapper }>
            { children }
        </div>
    );
}

export default Main;
