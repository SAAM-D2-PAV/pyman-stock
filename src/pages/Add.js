import axios from 'axios';
import React, {useEffect, useState,useContext, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


// made components
import AuthContext from '../context/AuthProvider';
import Navigation from '../components/Navigation';
import {setEquipmentToTask} from "../utils/functions";

import Scanner from '../components/scanner/Scanner';


const Add = () => {
    //Headers en-tête HTTP Authorization
    const auth = useContext(AuthContext);
    //Gerstion des erreurs
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    //Variables et Fonctions du composant
    //Variable taskData (tableau vide) -> stockage de la tache
    const [taskData,setTaskData] = useState([]);
    //Variable initialement vide se remplie si le champs texte est modifié (recherche)
    const [inputSearch, setInputSearch] = useState([]);
    //Variable equipmentData (tableau vide) -> récupération du matériel récupérée par axios
    const [equipmentsData,setEquipmentsData] = useState([]);

    //BARCODE ELEMENTS
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {id} = useParams();
    

    //Requète vers API
   const getEquipments = () => {
    axios
    //On récupère les equipements
    .get(process.env.REACT_APP_URL+'api/equipment?identificationCode=' + inputSearch, {headers: {'Authorization': 'Bearer '+auth.auth.accessToken}})
    .catch(
        function (error) {
            if (error.response) {
              // la requête a été faite et le code de réponse du serveur n’est pas dans
              // la plage 2xx

              setErrMsg(error.response.data.message);
              errRef.current.focus();

            } 
          }
        )
    //Puis on les charge dans equipmentsData via setEquipmentsData
    .then((res)=>setEquipmentsData(res.data['hydra:member']));

   }
    // - 1
    //lancé une fois le DOM chargé grace au callback []
    useEffect( () => {
        //On récupère la tache et on la stock dans taskData
        axios.get(process.env.REACT_APP_URL+`api/tasks/${id}`,{headers: {'Authorization': 'Bearer '+auth.auth.accessToken}}).then(
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
               (e) => setEquipmentToTask("addEq_ToTask",Number(id),e.id,auth)
           )

       }
    },[equipmentsData])
   
    return (
        <div className='add'>
             <Navigation/> 
             <div className="container text-center">

                <div className={ errMsg ? "errmsg alert alert-warning alert-dismissible fade show" : "d-none"} role="alert">
                    <strong>Holy guacamole!</strong> {errMsg} Veuillez vous reconnecter.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>window.location.reload(false)}></button>
                </div>

                <h3>Scan tâche {taskData.id}</h3>
                <h4 className='red_flag'> {taskData.name} </h4>

                <div className="row">
                
                    <div className="col text-center" >
                        

                        <button className="btn btn-success mb-2" onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Scanner'}</button>
            
                        {scanning ?

                        <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
                            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                            <canvas className="drawingBuffer" style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                height: '100%',
                                 width: '100%',
                                border: '3px solid green',
                                overflow:'hidden'
                            }} width="1920" height="1080" />
                           
                        </div>

                        :""}

{scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) =>setInputSearch(result)} /> : null}
                    </div>

                    <div className="col-12 mt-2">
                        <p>Ou taper le code d'identification matériel</p>
                        <div className="input-group mt-3 col-md-4 mb-2">
                            <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" className="form-control" placeholder="ex: 100286" onChange={(e) => setInputSearch(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <button className="btn btn-warning">
                                <Link to={`../tache/${taskData.id}`} className="linkBtn">
                                    <i className="fa-solid fa-arrow-left"></i> RETOUR
                                </Link>
                            </button>
                        </div>
                        
                    </div> 
                    <div className="col-12 mt-2">
                     
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
    );
};

export default Add;