import React, {useEffect} from 'react';

// made components
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from "axios";

const Tasks = () => {
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() =>{
        axios.get("https://127.0.0.1:8000/lmrdcrom_!/api/task").then((res)=>console.log(res))
    },[])

    return (
        <div className="tasks">
            <Logo/>
            <Navigation/>
            <div className="container">
                <h1>Tâches</h1>

            </div>
        </div>
    );
};

export default Tasks;