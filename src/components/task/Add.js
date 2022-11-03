import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// made components
import Navigation from '../Navigation';
import {setEquipmentToTask} from "../../utils/functions";
import {URL} from '../../utils/functions';

const Add = () => {

    //Variables et Fonctions du composant
    //Variable taskData (tableau vide) -> stockage de la tache
    const [taskData,setTaskData] = useState([]);
    //Variable initialement vide se remplie si le champs texte est modifié (recherche)
    const [inputSearch, setInputSearch] = useState([]);
    //Variable equipmentData (tableau vide) -> récupération du matériel récupérée par axios
    const [equipmentsData,setEquipmentsData] = useState([]);

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();

    //Requète vers API
   const getEquipments = () => {
    axios
    //On récupère les equipements
    .get(`${URL}api/equipment?identificationCode=` + inputSearch)
    //Puis on les charge dans equipmentsData via setEquipmentsData
    .then((res)=>setEquipmentsData(res.data['hydra:member']));

   }
    // - 1
    //lancé une fois le DOM chargé grace au callback []
    useEffect( () => {
        //On récupère la tache et on la stock dans taskData
        axios.get(`http://localhost:8000/api/tasks/${id}`).then(
            (res)=> setTaskData(res.data),
        );

    },[]);

   // - 2
   //Ici on  relance grace au callBack quand inputSearch est modifié
   useEffect( 
    () => getEquipments(),[inputSearch],
   )
   // - 3
    //Ici on envoi le matériel selectionné vers le serveur lorsqu'un équipement est selectionné
    useEffect( () => {

       if(equipmentsData){
           equipmentsData.map(
               (e) => setEquipmentToTask("addEq_ToTask",Number(id),e.id)
           )

       }
    },[equipmentsData])
   
    return (
        <div className='add'>
             <Navigation/> 
             <div className="container text-center">
        
                <h3>Scan tâche {taskData.id}</h3>
                <h4 className='red_flag'> {taskData.name} </h4>
                <div className="row">
                    <div className="col">

                        <div className="card">
                            <div className="card-body">
                                <button className="btn btn-warning">
                                    <Link to={`../tache/${taskData.id}`} className="linkBtn">
                                        <i className="fa-solid fa-arrow-left"></i> RETOUR
                                    </Link>
                                </button>
                            </div>
                        </div>

                        <div className="input-group mt-3 col-md-4">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" className="form-control" placeholder="code d'identification matériel" onChange={(e) => setInputSearch(e.target.value)}/>
                        </div>

                        <div className="row g-2">

                        {
                            //Boucle sur le tableau equipmentsData[]
                            equipmentsData && equipmentsData
                                .map(
                                (equipment) => 
                                <div key={equipment.id} className="mt-3">
                                    <li><h5>{equipment.name}</h5></li>
                                </div>
                                
                            )
                        }
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default Add;