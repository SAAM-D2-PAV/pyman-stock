import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// made components
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthProvider';

const About = () => {

     //Authorization 
     const auth = useContext(AuthContext);

    return (
        <div className='about'>
           
            <Navigation/>
            <div className="container">
                <h1>À propos</h1>
                <h5>Comment ça fonctionne ? </h5>
                <div className="ts-picture mb-3"></div>
                <h6> ➡ Pour une sortie de matériel</h6>
                <ul className="list-group">
                   
                    {
                    auth ? 
                        <>
                            <li className="list-group-item">
                                1 - Naviguer dans l'onglet {" "}
                                <NavLink to={"/taches"}>
                                 Tâches.
                                </NavLink>
                                {" "}⛵
                            </li>
                        </>
                        : null
                    }
                    <li className="list-group-item list-group-item-primary">
                        2 - Rechercher une tâche par son intitulé. 👀
                    </li>
                    <li className="list-group-item list-group-item-secondary">
                        3 - Selectionner  <em>"Sortie"</em>. 🛫
                    </li>
                    <li className="list-group-item list-group-item-success">
                        4 - Scanner le code barres ou taper le numéro du matériel pour l'ajouter à la tâche, le nom s'affiche et est ajouté automatiquement. ✅
                    </li>
                    <li className="list-group-item list-group-item-danger">
                        5 - Procéder de même pour tout le matériel. ➿
                    </li>
                    <li className="list-group-item list-group-item-warning">6 - Voilà c'est terminé, bye. &#128526;</li>
                    
                </ul>
                <h6>⬅ Pour une rentrée de matériel</h6>

                <ul className="list-group">
                    <li className="list-group-item list-group-item-info">En préparation 🍳</li>
                </ul>
                
            </div>
        </div>
    );
};

export default About;