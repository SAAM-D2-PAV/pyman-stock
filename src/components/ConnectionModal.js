import React from 'react';

const ConnectionModal = () => {
    return (
        <div className='connectionModal'>
            <form>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="" required/>
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>
        </div>
    );
};

export default ConnectionModal;