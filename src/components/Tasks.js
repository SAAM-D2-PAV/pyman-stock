import React, {useEffect, useState} from 'react';
import axios from "axios";
// made components
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';


const Tasks = () => {
    const [data,setData] = useState([]);
    // Le useEffect se joue lorsque le composant est monté
    useEffect(() =>{
        axios
            .get("http://127.0.0.1:8000/api/tasks")
            .then((res)=>setData(res.data))
    },[])

    return (
        <div className="tasks">
            <Logo/>
            <Navigation/>
            <div className="container">
                <h1>Tâches</h1>
                <ul>
                    {
                       
                    }
                </ul>
            </div>
        </div>
    );
};

export default Tasks;