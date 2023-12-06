import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error: string;
};

function Input( { label, error, ...rest }: Props ): React.ReactElement {
    const styles = {
        wrapper: 'mb-2',
        label: 'block text-xs font-bold mb-1',
        input: `block w-full rounded p-2 border focus:outline-none ${ error ? 'border-red-600' : 'border-gray-200 focus:border-primary' }`,
        error: 'text-xs font-bold text-red-600',
    };

    return (
        <div className={ styles.wrapper }>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label className="block">
                <span className={ styles.label }>{ label }</span>
                <input className={ styles.input } { ...rest } />
            </label>
            { error && (
                <div className={ styles.error }>
                    { error }
                </div>
            ) }
        </div>
    );
}

export default Input;
