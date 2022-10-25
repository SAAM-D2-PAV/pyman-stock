import React from 'react';

// made components
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div>
         
            <Navigation/>
            <div className="container">
                <h1>Accueil</h1>
                <p>Hello World!</p>
            </div>
        </div>
    );
};

export default Home;