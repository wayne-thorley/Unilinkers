module.exports = {
    darkMode: [ 'class' ],
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                body: [ 'Nunito Sans', 'sans-serif' ],
                heading: [ 'Nunito Sans', 'sans-serif' ],
            },
            colors: {
                body: '#192630',
                primary: '#06b9df',
            },
        },
        container: {
            center: true,
            padding: '0.75rem',
        },
    },
    plugins: [],
};
