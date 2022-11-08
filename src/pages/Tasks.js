import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";


// made components
import Navigation from '../components/Navigation';
import ThumbnailTask from '../components/task/ThumbnailTask';
import AuthContext from "../context/AuthProvider";


const Tasks = () => {
    //Variables et Fonctions du composant
    //Variable tasksData (tableau vide) -> stockage des taches récupérées par axios
    const [tasksData,setTasksData] = useState([]);
    //Variable initialement vide se remplie si le champs texte est modifié (recherche)
    const [inputSearch, setInputSearch] = useState("");
    //Headers en-tête HTTP Authorization
    const auth = useContext(AuthContext);

    //Requète vers API
    const getTasks = () => {
        axios
        //On récupère les taches
        .get(process.env.REACT_APP_URL+'api/tasks?status=A%20faire&name=' + inputSearch, {headers: {'Authorization': 'Bearer '+auth.auth.accessToken}})
        //Puis on les charge dans tasksData via setTasksData
        //.then((res)=>setTasksData(res.data['hydra:member']));
            .then(res=>{
                console.log(res.data)})
    }
    // Le useEffect se joue lorsque le composant est monté au chargement de la page
    // Ici on lance la fonction getTasks et on relance grace au callBack quand inputSearch est modifié
    useEffect(() => getTasks(),[inputSearch])

    return (
        <div className="tasks">
        
            <Navigation/>
            <div className="container text-center">

                <h3>Toutes les tâches à faire sur Pyman</h3>
                <div className="picture mb-3"></div>
               
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="input-group mb-3 col-md-4">
                        <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" className="form-control" placeholder="rechercher une tâche" onChange={(e) => setInputSearch(e.target.value)}/>
                    </div>
                    <div className="col-md-4"></div>
                </div>


                <div className="row g-2">

                        {
                            //Boucle sur le tableau de tasks tasksData[]
                            tasksData && tasksData
                                //classer les tâches par dates
                                .sort((a,b) => (b.date - a.date))
                                //On bloucle sur le tableau taskData
                                .map(
                                //On utilise le composant <Task/> pour fractionner le code
                                (task) => <ThumbnailTask key={task.id} task={task} />
                            )
                        }
                        
                </div>
            </div>
        </div>
    );
};

export default Tasks;