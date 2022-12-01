import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// made components
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthProvider';
//Fonctions globales du composant AppFunction.js
import { dateFormater, setEquipmentToTask } from '../utils/functions';
import { hourFormater } from '../utils/functions';


const Task = () => {
    //Headers en-tête HTTP Authorization
    const auth = useContext(AuthContext);
    //Variables et Fonctions du composant
    //Gerstion des erreurs
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();

    //Variable taskData (tableau vide) -> stockage de la tache récupérée par axios
    const [taskData,setTaskData] = useState([]);
    //lancé une fois le DOM chargé grave au []
   useEffect( () => {
       //On récupère la tache
       axios.get(process.env.REACT_APP_URL+`api/tasks/${id}`,{headers: {'Authorization': 'Bearer '+auth.auth.accessToken}})
       .catch(
        function (error) {
            if (error.response) {
              // la requête a été faite et le code de réponse du serveur n’est pas dans
              // la plage 2xx

              setErrMsg(error.response.data?.message);
              errRef.current.focus();

            } 
          }
        )
       .then( 
            (res)=> setTaskData(res.data),
        );

   })

    return (
           
            <div className='task'>

                <Navigation/> 
                
                <div className="container text-center">

                    <div className={ errMsg ? "errmsg alert alert-warning alert-dismissible fade show" : "d-none"} role="alert">
                        <strong>Holy guacamole!</strong> {errMsg} Veuillez vous reconnecter.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>window.location.reload(false)}></button>
                    </div>

                    <h3>Tâche {taskData.id}</h3>
                    <h4 className='red_flag'> {taskData.name} </h4>
                    {/*on vérifie l'existance de taskData.project avec && {taskData.project && taskData.project.name}*/}
                    <h5 className="card-subtitle mb-2 imperial_primer">{taskData.project && taskData.project.name} </h5>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                            
                                <div className="">
                                    <div className="picture"></div>
                                    <div className="card-body row">
                                    <div className='col'>
                                        <button className="btn btn-success">
                                           
                                            <Link to={`../tache/${taskData.id}/add`} className="linkBtn">
                                                <h6>SORTIE</h6>
                                                <i className="fa-solid fa-barcode fa-3x"></i>
                                            </Link>
                                        </button>
                                    </div>
                                    <div className='col'>
                                        <button className="btn btn-warning">
                                            <Link to={`../tache/${taskData.id}/add`} className="linkBtn"> 
                                                <h6>RETOUR</h6>  
                                                <i className="fa-solid fa-barcode fa-3x"></i>
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                                    <h6>{ taskData.category && taskData.category.name }</h6>
                                    <p className="card-text"> {dateFormater(taskData.startDate)} - {hourFormater(taskData.startHour)}</p>
                                    <p className="card-text"> {dateFormater(taskData.endDate)} - {hourFormater(taskData.endHour)}</p>
                                    <i> { taskData.location && taskData.location.name} </i>
                                </div>
                                <h4 className=''>Matériel</h4>
                                <ul className="list-group list-group-flush mb-5">
                                    
                                    <div className="materialList"> 
                                        {
                                            taskData.equipment && taskData.equipment
                                            .map((equipment) => 
                                               
                                                <li key={equipment.id} className="list-group-item">
                                                    <span className='delAction' onClick={ () => setEquipmentToTask('RemEq_ToTask',taskData.id,equipment.id,auth) }><i className="fa-solid fa-trash"></i></span>

                                                    {equipment.name} 

                                                    {equipment.status === "Défectueux" ? (

                                                    
                                                   <span className="badge text-bg-danger red_flag">Défectueux <i className="fa-solid fa-exclamation"></i></span>
                                                               
                                                    ) : ("") }
                                                    {equipment.missing === 1 ? (

                                                     <span className="badge text-bg-danger red_flag">Manquant <i className="fa-solid fa-exclamation"></i></span>
   
                                                    ) : ("") }
                                                  
                                                </li>
                                            )                               
                                        }
                                   </div>
                                </ul>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    );
};

export default Task;