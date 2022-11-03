import React from 'react';

// made components
import ConnectionModal from '../components/ConnectionModal';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div>

            <ConnectionModal></ConnectionModal>
         
            <Navigation/>
            <div className="container">
                <h1>Accueil</h1>
                <p>Hello World!</p>
            </div>
        </div>
    );
};

export default Home;