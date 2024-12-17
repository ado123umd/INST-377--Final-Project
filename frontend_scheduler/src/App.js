import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import  SchedulePage from './pages/SchedulePage';
import './App.css';
import About from './pages/About';
import Courses from './components/Courses';


const App = () => {
    return (
        <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/courses" element={<Courses />} />

        </Routes>
      </Router>

    );
   
};

export default App;
