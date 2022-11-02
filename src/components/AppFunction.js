//Fonctions globales de l'application


import axios from "axios";
import Swal from "sweetalert2";

//Formatage de la date
export const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month:"long",
        day:"numeric"
    })
    return newDate;
}
 //Formatage de l'heure
 export const hourFormater = (hour) => {
    let newHour = new Date(hour).toLocaleTimeString("fr-FR", {
        hour:"numeric",
        minute:"numeric"
    })
    return newHour;
}
//Fonction d'envoi des données au serveur via API
export const setEquipmentToTask = (action, tid, eid) => {
    /*dataType: "json",
     async: false,
     type: 'GET',
     data: {action: value, parameter: param},
     url: '/ajaxCtl'*/

    if (action === "addEq_ToTask"){
        const params = {
            action: action,
            parameters: {tid,eid}
        };
        axios.put(`http://127.0.0.1:8000/apip/setEquipment`, { params }).then(
            (res)=> {

                if (res.data === "linked"){
                    Swal.fire({
                        title: 'Oups!',
                        text: "Matériel déjà associé",
                        icon: 'warning',
                        confirmButtonText: 'Cool',
                        denyButtonText: 'nope'
                    })
                }
            }
        );

    }
}