import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// made components
import Navigation from '../components/Navigation';

  
const Task = () => {
    //Variables et Fonctions du composant
        
    //Variable tasksData (tableau vide) -> stockage des taches récupérées par axios
    const [taskData,setTaskData] = useState([]);
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();
    //Requète vers API
    const getTask = () => {
        axios
        //On récupère la tache
        .get(`http://127.0.0.1:8000/api/tasks/${id}`)
        //Puis on les charge dans tasksData via setTasksData
        .then((res)=>setTaskData(res.data['hydra:member']));
    }
    // Le useEffect se joue lorsque le composant est monté au chargement de la page
    // Ici on lance la fonction getTask
    useEffect(() => getTask(), [])

    return (
        <div>
            <Navigation/> 
            <h5>Tache n°{id}</h5>
        </div>
    );
};

export default Task;