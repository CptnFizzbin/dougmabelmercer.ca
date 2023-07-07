import React from 'react';

import headerImg from './images/header.jpg'
import './Header.scss';

const Header = () => (
    <header>
        <div className="surface">
            <div className="names">Doug &amp; Mabel Mercer</div>
            <img className="image" src={headerImg} alt="Doug &amp; Mabel Mercer"/>

            <div className="doug">
                <div className="name">Douglas William Mercer</div>
                <div className="dates">1939 - 2020</div>
            </div>

            <div className="mabel">
                <div className="name">Mabel Armorel Mercer</div>
                <div className="dates">1938 - 2019</div>
            </div>
        </div>
    </header>
)

export default Header;
