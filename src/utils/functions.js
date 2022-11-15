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
export const setEquipmentToTask = (action, tid, eid, token) => {
    /*dataType: "json",
     async: false,
     type: 'GET',
     data: {action: value, parameter: param},
     url: '/ajaxCtl'*/
     const params = {
        action: action,
        parameters: {tid,eid},
    };

    if (action === "addEq_ToTask"){
        axios.put(`${process.env.REACT_APP_URL}apip/setEquipment`, { params }, {headers: {'Authorization': 'Bearer '+token.auth.accessToken}}).then(
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
                else if(res.data.status === "Défectueux"){
                    Swal.fire({
                        title: 'Attention!',
                        text: "Matériel indiqué défectueux",
                        icon: 'warning',
                        confirmButtonText: 'J\'ai compris',
                        denyButtonText: 'nope'
                    })
                }
                else if(res.data.missing === 1){
                    Swal.fire({
                        title: 'Attention!',
                        text: "Matériel indiqué manquant",
                        icon: 'warning',
                        confirmButtonText: 'J\'ai compris',
                        denyButtonText: 'nope'
                    })
                }
            }
        );
    }
    else if(action === "RemEq_ToTask"){
        Swal.fire({
            title: 'Retirer le matériel de la tâche ?',
            showDenyButton: true,
            confirmButtonText: 'Oui',
            denyButtonText: `Non`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`${process.env.REACT_APP_URL}apip/setEquipment`, { params }, {headers: {'Authorization': 'Bearer '+token.auth.accessToken}}).then(
                    (res)=> {
                        Swal.fire('Retiré !', '', 'success')
                    }
                );
            } 
            else if (result.isDenied) {
              Swal.fire('Annulé !', '', 'info')
            }
          })
    }
}

