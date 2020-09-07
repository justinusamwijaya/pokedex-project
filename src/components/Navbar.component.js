import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const Navbar = () => {
    
    return (
        <div>
            <div className="navbar">
                <Link style={{height: '100%', display: 'flex', alignItems: 'center'}} to = '/'>
                    <img className="logo" src={logo}/>
                    <p style={{marginLeft: 10}}>Pokedex</p>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;
