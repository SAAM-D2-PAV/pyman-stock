import React from 'react';

const Task = ({task}) => {
    //Variables et Fonctions du composant
    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month:"long",
            day:"numeric"
        })
        return newDate;
    }
    const hourFormater = (hour) => {
        let newHour = new Date(hour).toLocaleTimeString("fr-FR", {
            hour:"numeric",
            minute:"numeric"
        })
        return newHour;
    }
    return (

        <div className='task col-md-6 col-xs-12'>
        <div className="task-wrapper animate__animated animate__fadeIn p-3 border bg-light">
            <div className="">
                <h5 className="task-title">{task.name}</h5>
                <h6 className="card-subtitle mb-2 imperial_primer">Du {dateFormater(task.startDate)} à {hourFormater(task.startHour)} </h6>
                <h6 className="card-subtitle mb-2 red_flag">Au {dateFormater(task.endDate)} à {hourFormater(task.endHour)}</h6>
                <button type="button" class="btn blue_chart_0_bg "><i class="fa-solid fa-plus-minus"></i></button>
            </div>
        </div>
       </div>
    )
   
   
};

export default Task;