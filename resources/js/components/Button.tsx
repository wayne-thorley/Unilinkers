import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

function Button( { children, ...rest }: Props ): React.ReactElement {
    const styles = { wrapper: 'px-3 py-2 rounded text-xs font-bold bg-primary text-white focus:outline-none' };

    return (
        <button
            className={ styles.wrapper }
            type="button"
            { ...rest }>
            { children }
        </button>
    );
}

export default Button;
