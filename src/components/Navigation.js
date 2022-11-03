import React from 'react';
import { NavLink } from 'react-router-dom';

// made components



const Navigation = () => {
    return (
        
        <div className='navigation'>
            <h3>Pyman Stock</h3>
            <ul className='nav justify-content-center'>

                <NavLink to={"/"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                    <li className='nav-item'>Accueil</li>
                </NavLink>
                <NavLink to={"/taches"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                    <li className='nav-item'>Tâches</li>
                </NavLink>
                <NavLink to={"/a-propos"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                    <li className='nav-item'>A propos</li>
                </NavLink>

            </ul>
        </div>
    );
};

export default Navigation;