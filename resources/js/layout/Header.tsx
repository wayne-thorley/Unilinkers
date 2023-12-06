import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../router';

function Header(): React.ReactElement {
    const styles = {
        wrapper: 'bg-white py-3',
        container: 'container flex items-center justify-between',
        logoText: 'font-bold text-2xl hover:text-primary transition-colors duration-250',
        navList: 'flex',
        navItem: 'ml-3',
        navLink: 'font-bold hover:text-primary transition-colors duration-250',
    };

    const navItems = [
        {
            name: 'Property',
            route: routes.property.list,
        },
        {
            name: 'Room',
            route: routes.room.list,
        },
    ];

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.container }>
                <Link to={ routes.home } className={ styles.logoText }>
                    { import.meta.env.VITE_APP_NAME }
                </Link>
                <nav>
                    <ul className={ styles.navList }>
                        { navItems.map( item => (
                            <li key={ item.route } className={ styles.navItem }>
                                <Link to={ item.route } className={ styles.navLink }>
                                    { item.name }
                                </Link>
                            </li>
                        ) ) }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
