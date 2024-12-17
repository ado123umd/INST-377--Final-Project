import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../services/api';
import '../styles/Courses.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Courses = () => {
  const [data, setData] = useState({
    courses: [],
    majors: [],
    departments: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch data from backend Endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, majorsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/majors'),
        ]);

        const departmentsRes = await fetch('https://api.umd.io/v1/courses/departments')
          .then((response) => response.json());

        // Update state with fetched data
        setData({
          courses: coursesRes.data || [],
          majors: majorsRes.data || [],
          departments: departmentsRes || [],
        });

        // Set initial filtered data
        setFilteredCourses(coursesRes.data || []);
        setFilteredMajors(majorsRes.data || []);
        setFilteredDepartments(departmentsRes || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle Tab Switching
  const handleTabChange = (tab) => setActiveTab(tab);

  // Handle Search Functionality for Courses, Majors, and Departments
  const handleSearch = (event, type) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (type === 'courses') {
      if (!query) {
        setFilteredCourses(data.courses);
        return;
      }
      const filtered = data.courses.filter(
        (course) =>
          course.name.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query) ||
          course.course_id.toLowerCase().includes(query)
      );
      setFilteredCourses(filtered);
    } else if (type === 'majors') {
      if (!query) {
        setFilteredMajors(data.majors);
        return;
      }
      const filtered = data.majors.filter(
        (major) =>
          major.name.toLowerCase().includes(query) ||
          major.college?.toLowerCase().includes(query)
      );
      setFilteredMajors(filtered);
    } else if (type === 'departments') {
      if (!query) {
        setFilteredDepartments(data.departments);
        return;
      }
      const filtered = data.departments.filter(
        (department) =>
          department.dept_id.toLowerCase().includes(query) ||
          department.description?.toLowerCase().includes(query)
      );
      setFilteredDepartments(filtered);
    }
  };

  // Close Selected Course Details
  const closeDetails = () => setSelectedCourse(null);

  return (
    <div className="course-modules">
      <h1>Courses Module</h1>

      <div className="tabs">
        {['courses', 'majors', 'departments'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <section className="search-section">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => handleSearch(e, 'courses')}
                className="search-input"
              />
            </section>

            <section className="course-list">
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <div
                    key={course.course_id}
                    className="course-card"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <h3>{course.name}</h3>
                    <p>{course.description ? course.description.slice(0, 100) + '...' : 'No description available'}</p>
                  </div>
                ))}
              </div>
            </section>

           

            {selectedCourse && (
              <div className="course-details-modal">
                <div className="modal-content">
                  <h2>{selectedCourse.name}</h2>
                  <p>{selectedCourse.description}</p>
                  <p>Semester: {selectedCourse.semester}</p>
                  <p>Credit Score: {selectedCourse.credits}</p>
                  <button onClick={closeDetails}>Close</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Majors Tab */}
        {activeTab === 'majors' && (
          <div>
            <section className="search-section">
              <input
                type="text"
                placeholder="Search for majors..."
                value={searchQuery}
                onChange={(e) => handleSearch(e, 'majors')}
                className="search-input"
              />
            </section>

            <div className="majors-grid">
              {filteredMajors.map((major) => (
                <div key={major.id} className="major-card">
                  <h3>{major.name}</h3>
                  <p>{major.college || 'No college information available'}</p>
                  {major.url && (
                    <a href={major.url} target="_blank" rel="noopener noreferrer" className="major-link">
                      Learn More
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div>
            <section className="search-section">
              <input
                type="text"
                placeholder="Search for departments..."
                value={searchQuery}
                onChange={(e) => handleSearch(e, 'departments')}
                className="search-input"
              />
            </section>

            <div className="content-grid">
              {filteredDepartments.map((department) => (
                <div key={department.dept_id} className="content-card">
                  <h3>{department.dept_id}</h3>
                  <p>{department.description || 'No description available'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
