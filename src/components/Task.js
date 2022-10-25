import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// made components
import Navigation from '../components/Navigation';

  
const Task = () => {
    //Variables et Fonctions du composant

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();

    //Variable taskData (tableau vide) -> stockage de la tache récupérée par axios
    const [taskData,setTaskData] = useState([]);
    //Variable projectData (tableau vide) -> stockage du projet lié à la tâche par axios
   
   
    //Requète vers API
    const getData = () => {
        axios
        //On récupère la tache
        .get(`http://127.0.0.1:8000/api/tasks/${id}`)
        //Puis on les charge dans tasksData via setTasksData
        .then(

            (res)=>setTaskData(res.data)
      

        )
    }

   useEffect( () => getData(), [] ) 
   

    return (
        <div className='task'>
            <Navigation/> 
            <div className="container text-center">
                <h3>Tâche {taskData.id}</h3>
                <h4 className='red_flag'> {taskData.name} </h4>
                <h6 className="card-subtitle mb-2 imperial_primer">projet :  </h6>
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                           
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                            </ul>
                            <div className="card-body">
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="picture col-3"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Task;