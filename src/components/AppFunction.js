//Fonctions globales de l'application

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