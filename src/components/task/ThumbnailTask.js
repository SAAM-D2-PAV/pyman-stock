import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

//Fonctions globales du composant AppFunction.js
import { dateFormater } from '../../utils/functions';
import { hourFormater } from '../../utils/functions';


const ThumbnailTask = ({task}) => {
    //Variables et Fonctions du composant
    //Variable tasksData (tableau vide) -> stockage des taches récupérées par axios
    //const [taskData,setTaskData] = useState([]);
   
    // //Fonction onclick affichage d'une tâche
    // const activateTask = (id) => {
    //     axios
    //     //On récupère la tache
    //     .get("http://127.0.0.1:8000/api/tasks/",{id})
    //     //Puis on les charge dans tasksData via setTasksData
    //     .then((res)=>setTaskData(res.data['hydra:member']));
        
    // }
    return (

        <div className='th-task col-md-6 col-xs-12'>
        <div className="th-task-wrapper animate__animated animate__fadeIn p-3 border bg-light">
            <div className="">
                <h5 className="th-task-title">{task.name}</h5>
                <h6 className="card-subtitle mb-2 imperial_primer">Du {dateFormater(task.startDate)} à {hourFormater(task.startHour)} </h6>
                <h6 className="card-subtitle mb-2 red_flag">Au {dateFormater(task.endDate)} à {hourFormater(task.endHour)}</h6>
                <button key={task.id} className="btn btn-info">
                    <Link to={`../tache/${task.id}`} className="linkBtn">
                        voir <i className="fa-solid fa-plus"></i>
                    </Link>
                </button>

            </div>
        </div>
       </div>
    )
   
   
};

export default ThumbnailTask;