import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const ThumbnailTask = ({task}) => {
    //Variables et Fonctions du composant
    //Variable tasksData (tableau vide) -> stockage des taches récupérées par axios
    const [taskData,setTaskData] = useState([]);
    //Formatage de la date
    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month:"long",
            day:"numeric"
        })
        return newDate;
    }
    //Formatage de l'heure
    const hourFormater = (hour) => {
        let newHour = new Date(hour).toLocaleTimeString("fr-FR", {
            hour:"numeric",
            minute:"numeric"
        })
        return newHour;
    }
    //Fonction onclick affichage du tâche
    const activateTask = (id) => {
        axios
        //On récupère la tache
        .get("http://127.0.0.1:8000/api/tasks/",{id})
        //Puis on les charge dans tasksData via setTasksData
        .then((res)=>setTaskData(res.data['hydra:member']));
        
    }
    return (

        <div className='task col-md-6 col-xs-12'>
        <div className="task-wrapper animate__animated animate__fadeIn p-3 border bg-light">
            <div className="">
                <h5 className="task-title">{task.name}</h5>
                <h6 className="card-subtitle mb-2 imperial_primer">Du {dateFormater(task.startDate)} à {hourFormater(task.startHour)} </h6>
                <h6 className="card-subtitle mb-2 red_flag">Au {dateFormater(task.endDate)} à {hourFormater(task.endHour)}</h6>
                 <li key={task.id}> <Link to={`../tache/${task.id}`}> <i className="fa-solid fa-plus-minus"></i> {task.id} </Link> </li> 
            </div>
        </div>
       </div>
    )
   
   
};

export default ThumbnailTask;