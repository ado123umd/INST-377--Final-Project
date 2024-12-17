import React from 'react';
import {Link} from 'react-router-dom';
import Courses from '../components/Courses';

import '../styles/Home.css';

const Home = () => {
    return (
        < >
       
            <div className="home">
                <header className="home-header">
                <h2>Plan your academic journey</h2>
                <p> Create your perfect class schedule with our comprehensive course planning tools </p>
                </header>
                <Link to ='/about' className = "btn-primary"> Start Planning</Link>

            </div>
          
        <Courses />
    

          </>

    );

};

export default Home;
