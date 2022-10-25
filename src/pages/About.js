import React from 'react';

// made components
import Navigation from '../components/Navigation';

const About = () => {
    return (
        <div>
           
            <Navigation/>
            <div className="container">
                <h1>A propos</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, pariatur ex fugit laudantium, incidunt officiis tempore a facilis, quisquam voluptas ab neque quos assumenda consectetur dolor reiciendis itaque alias explicabo.</p>
            </div>
        </div>
    );
};

export default About;