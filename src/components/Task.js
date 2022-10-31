import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// made components
import Navigation from '../components/Navigation';
//Fonctions globales du composant AppFunction.js
import { dateFormater } from './AppFunction';
import { hourFormater } from './AppFunction';
  
const Task = () => {
    //Variables et Fonctions du composant
    
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();

    //Variable taskData (tableau vide) -> stockage de la tache récupérée par axios
    const [taskData,setTaskData] = useState([]);
    //lancé une fois le DOM chargé grave au []
   useEffect( () => {
       //On récupère la tache
       axios.get(`http://127.0.0.1:8000/api/tasks/${id}`).then( 
            (res)=> setTaskData(res.data),
        );

   })

    return (
           
            <div className='task'>

                <Navigation/> 
                
                <div className="container text-center">
    
                    <h3>Tâche {taskData.id}</h3>
                    <h4 className='red_flag'> {taskData.name} </h4>
                    {/*on vérifie l'existance de taskData.project avec && {taskData.project && taskData.project.name}*/}
                    <h5 className="card-subtitle mb-2 imperial_primer">{taskData.project && taskData.project.name} </h5>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                            
                                <div className="card-body">
                                    <div className="picture"></div>
                                    <h6>{ taskData.category && taskData.category.name }</h6>
                                    <p className="card-text"> {dateFormater(taskData.startDate)} - {hourFormater(taskData.startHour)}</p>
                                    <p className="card-text"> {dateFormater(taskData.endDate)} - {hourFormater(taskData.endHour)}</p>
                                    <i> { taskData.location && taskData.location.name} </i>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <h4 className='mt-3'>Matériel</h4>
                                   {
                                         taskData.equipment && taskData.equipment
                                         .map((equipment) => <li key={equipment.id} className="list-group-item">{equipment.name}</li>)                               
                                   }
                                </ul>
                                <div className="card-body">
                                    <button className="btn btn-success">
                                        <Link to={`../tache/${taskData.id}/add`} className="linkBtn">
                                            SCAN DEPART <i className='fa-solid fa-qrcode'></i>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    );
};

export default Task;