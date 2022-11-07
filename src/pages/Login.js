import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';



const ConnectionModal = () => {


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
                    headers: {'Content-Type' : 'application/json'},
                }
                
            )
            setUser('');
            setPwd('');
            setSuccess(true)
            return response.data;
            

        } catch (error) {
           if (!error?.response) {
                setErrMsg('Le serveur de répond pas');
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
            <p className='m-3'>connecté</p>

        ):(
           
        <div className='connectionModal'>
            <h3>Pyman Stock</h3>
            <p ref={errRef} className={ errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


            <form onSubmit={handleConnection}>

                <div className="mb-3">
                    <label htmlFor='usermail' className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        ref={userRef}  
                        id='usermail' 
                        required 
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Mot de passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id='password' 
                        required 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Se connecter</button>

            </form>

        </div>
        )} </>
    );
};

export default ConnectionModal;