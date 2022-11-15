import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import jwt_decode from "jwt-decode";
// made components
import AuthContext from '../context/AuthProvider';


const Navigation = () => {
    //Authorization 
    const auth = useContext(AuthContext);
    const decoded =  auth?.auth.accessToken ? jwt_decode(auth.auth.accessToken) : undefined;

    const loggedUser = decoded?.email || "Non connecté";
   
    const roles = decoded?.roles || [];
    
    return (
      
           
            <div className='navigation'>
                
                <h3>Pyman Stock</h3>
                <p className='loggedUser'> {loggedUser} </p>
                
                <ul className='nav justify-content-center'>
                    <NavLink to={"/"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                        <li className='nav-item'>Accueil</li>
                    </NavLink>
                
                    <NavLink to={"/a-propos"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                        <li className='nav-item'>A propos</li>
                    </NavLink>
                    {
                        auth ? 
                        <>
                            <NavLink to={"/taches"} className={(nav) =>(nav.isActive ? "nav-active" : "")}>
                                <li className='nav-item'>Tâches</li>
                            </NavLink>
                        </>
                        : null
                    }
                    <div className='text-right'>
                        <button className="btn btn-warning" onClick={()=>window.location.reload(false)}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </ul>
                
            </div>
        
    );
};

export default Navigation;