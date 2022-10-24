import React from 'react';

const Task = ({task}) => {
    
    return (

        <div className='task'>
        <div className="card animate__animated animate__fadeIn">
            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{task.startDate}</h6>
               
                <a href="#" className="card-link">Détail +</a>
            </div>
        </div>
       </div>
    )
   
   
};

export default Task;