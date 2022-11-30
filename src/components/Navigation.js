import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import jwt_decode from "jwt-decode";
// made components
import AuthContext from '../context/AuthProvider';


const Navigation = () => {
    //Authorization 
    const auth = useContext(AuthContext);
    const decoded =  auth?.auth.accessToken ? jwt_decode(auth.auth.accessToken) : undefined;
    //heure d'expiration
    const exp = decoded?.exp || undefined;
    const expToTime = new Date(exp*1000);
    const expiredTime = expToTime.toLocaleTimeString("fr-FR");
    //mail user
    const loggedUser = decoded?.email || "Non connecté";
    //roles user
    const roles = decoded?.roles || [];
    
    return (
      
           
            <div className='navigation'>
                <div className="">
                    <div className='title'>
                        <h3>Pyman Stock</h3>
                       

                        {process.env.NODE_ENV === 'development' ? (

                            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
                                    
                        ) : ("") }
                        
                        <p className='loggedUser'> {loggedUser} </p>
                        <p className='logTimeOut'>Déconnexion automatique à {expiredTime} </p>
                    </div>
                    
                    <div className='logout'>
                        <button className="btn btn-warning" onClick={()=>window.location.reload(false)}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
                
                
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
                </ul>
                
            </div>
        
    );
};

export default Navigation;