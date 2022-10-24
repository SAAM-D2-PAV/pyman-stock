import React, {useEffect, useState} from 'react';
import axios from "axios";
// made components
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import Task from './Task';


const Tasks = () => {

    const [tasksData,setTasksData] = useState([]);
    
    const getTasks = () => {
        axios
        .get("http://127.0.0.1:8000/api/tasks?status=A%20faire")
        .then((res)=>setTasksData(res.data['hydra:member']));
    }
    // Le useEffect se joue lorsque le composant est monté  
    useEffect(() => getTasks(), [])

    return (
        <div className="tasks">
        
            <Navigation/>
            <div className="container">
                <div className="raw">
                
                <div className="picture col-3"></div>
                <h3>Toutes les tâches</h3>
                {
                    tasksData.map(

                        (task) => <Task key={task.id} task={task} />
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default Tasks;