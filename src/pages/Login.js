import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import {Navigate} from "react-router-dom";


const ConnectionModal = () => {

    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect( () => {
        userRef.current.focus()
    },[])

    useEffect( () => {
        setErrMsg('');
    },[user,pwd])

    const handleConnection = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                process.env.REACT_APP_CONNEXION_URL,
                JSON.stringify({
                    username:user,
                    password:pwd
                }),
                {
                    headers: {'Content-Type' : 'application/json'}
                }
            );
            //return response.data;

            const accessToken = response?.data?.token;
            setAuth({accessToken});
            setUser('');
            setPwd('');
            setSuccess(true)

        } catch (error) {
           if (!error?.response) {
                setErrMsg('Le serveur ne répond pas');
           }
           else if(error.response?.status === 400){
                setErrMsg('Identifiants manquants');
           }
           else if(error.response?.status === 401){
                setErrMsg('Vous n\'êtes pas autorisé à vous connecter');
            }
            else{
                setErrMsg('Connexion impossible');
            }
            errRef.current.focus();
        }
       
    }

    return (
        <>
        { success ? (

            <Navigate to={'/'}/>

        ):(
        <div>
            <div className="alert alert-info" role="alert">
                Bienvenue sur la version Beta de pyman stock !
            </div>
            <div className='connectionModal container'>
                <h3>Pyman Stock</h3>
                <p ref={errRef} className={ errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


                <form onSubmit={handleConnection}>

                    <div className="mb-3">
                        <label htmlFor='usermail' className="form-label"></label>
                        <input 
                            type="email" 
                            className="form-control email" 
                            ref={userRef}  
                            id='usermail'
                            placeholder='Adresse e-mail' 
                            required 
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='password' className="form-label"></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id='password' 
                            placeholder='Mot de passe' 
                            required 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Se connecter</button>

                </form>

            </div>
        </div>
        )} </>
    );
};

export default ConnectionModal;