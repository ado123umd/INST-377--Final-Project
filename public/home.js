
let courses = [];
let majors = [];

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            const target = tab.dataset.tab;
            tab.classList.add('active');
            const targetPanel = document.getElementById(`${target}-tab`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Fetch relevant data based on the active tab
            if (target === 'courses') loadCourses();
            if (target === 'departments') loadDepartments();
            if (target === 'majors') loadMajors();
        });
    });

    // Initial load for courses if the courses tab is active
    if (document.getElementById('courses-tab')) {
        loadCourses();
    }
});

function handleSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const activeTab = document.querySelector('.tab.active').dataset.tab;

    if (activeTab === 'courses') {
        const filteredCourses = courses.filter(course => {
            return course.name.toLowerCase().includes(searchQuery) || 
                   course.code.toLowerCase().includes(searchQuery) || 
                   course.description.toLowerCase().includes(searchQuery);
        });
        displayCourses(filteredCourses);
    } else if (activeTab === 'majors') {
        const filteredMajors = majors.filter(major => {
            return major.name.toLowerCase().includes(searchQuery) || 
                   major.college.toLowerCase().includes(searchQuery);
        });
        displayMajors(filteredMajors);
    }
}

// Function to display the filtered courses
function displayCourses(coursesToDisplay) {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';

    if (coursesToDisplay.length > 0) {
        coursesToDisplay.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <h3>${course.name} (${course.code})</h3>
                <p>${course.description}</p>
            `;
            courseElement.addEventListener('click', () => openModal(course));
            coursesGrid.appendChild(courseElement);
        });
    } else {
        coursesGrid.innerHTML = '<p>No courses found.</p>';
    }
}

// Function to display the filtered majors
function displayMajors(majorsToDisplay) {
    const majorsGrid = document.getElementById('majors-grid');
    majorsGrid.innerHTML = '';

    if (majorsToDisplay.length > 0) {
        majorsToDisplay.forEach(major => {
            const majorElement = document.createElement('div');
            majorElement.classList.add('feature');
            majorElement.innerHTML = `
                <h3>${major.name}</h3>
                <p>${major.college}</p>
                <a href="${major.url}" target="_blank" class="major-link">Learn more</a>
            `;
            majorsGrid.appendChild(majorElement);
        });
    } else {
        majorsGrid.innerHTML = '<p>No majors found.</p>';
    }
}

document.getElementById('searchButton').addEventListener('click', handleSearch);

document.getElementById('searchInput').addEventListener('input', handleSearch);

// Modal functionality
const modal = document.getElementById('course-modal');
const closeButton = document.querySelector('.close-button');
const modalCourseName = document.getElementById('modal-course-name');
const modalCourseDescription = document.getElementById('modal-course-description');
const modalCourseSemester = document.getElementById('modal-course-semester');
const modalCourseCredits = document.getElementById('modal-course-credits');

// Open the modal with course details
function openModal(course) {
    modalCourseName.textContent = course.name;
    modalCourseDescription.textContent = course.description;
    modalCourseSemester.textContent = course.semester;
    modalCourseCredits.textContent = course.credits;
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    modal.style.display = 'none';
}

closeButton.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fetch functions remain the same
function loadCourses() {
    fetch('http://localhost:5001/api/courses')
        .then(response => response.json())
        .then(fetchedCourses => {
            courses = fetchedCourses;  
            const coursesGrid = document.getElementById('courses-grid');
            if (coursesGrid) {
                coursesGrid.innerHTML = ''; 
                courses.forEach(course => {
                    const courseElement = document.createElement('div');
                    courseElement.classList.add('feature');
                    courseElement.innerHTML = `
                        <h3>${course.name}</h3>
                        <p>${course.description.substring(0, 100)}...</p>
                    `;
                    courseElement.addEventListener('click', () => openModal(course)); // Add event listener for modal
                    coursesGrid.appendChild(courseElement);
                });
            }
        })
        .catch(error => console.error('Error loading courses:', error));
}

function loadDepartments() {
    fetch('https://api.umd.io/v1/courses/departments')
        .then(response => response.json())
        .then(departments => {
            console.log(departments);  

            const departmentsSelect = document.getElementById('departments-dropdown');
            const departmentIdDisplay = document.getElementById('department-id-display');  
            
            if (departmentsSelect) {
                departmentsSelect.innerHTML = ''; 

                // Create a default "Select" option
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select a department';
                departmentsSelect.appendChild(defaultOption);

                
                if (Array.isArray(departments) && departments.length > 0) {
                    departments.forEach(department => {
                        const option = document.createElement('option');
                        option.value = department.dept_id;  
                        option.textContent = department.department;  
                        departmentsSelect.appendChild(option);
                    });
                } else {
                    // If no departments are found
                    const option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'No departments available';
                    departmentsSelect.appendChild(option);
                }
            }

            // Add event listener to the select dropdown
            departmentsSelect.addEventListener('change', function () {
                const selectedDeptId = departmentsSelect.value;
                const selectedDepartment = departments.find(department => department.dept_id === selectedDeptId);

                if (selectedDepartment) {
                    departmentIdDisplay.textContent = `Selected Department ID: ${selectedDepartment.dept_id}`;
                } else {
                    departmentIdDisplay.textContent = 'No department selected';
                }
            });
        })
        .catch(error => {
            console.error('Error loading departments:', error);
            const departmentsSelect = document.getElementById('departments-dropdown');
            if (departmentsSelect) {
                departmentsSelect.innerHTML = '<option value="">Failed to load departments</option>';
            }
        });
}

// Trigger the function to load departments
loadDepartments();

document.getElementById('departments-dropdown').addEventListener('change', function (event) {
    const selectedDepartment = event.target.value;
    console.log('Selected department:', selectedDepartment);
});

function loadMajors() {
    fetch('http://localhost:5001/api/majors') 
        .then(response => response.json())
        .then(fetchedMajors => {
            majors = fetchedMajors;  
            const majorsGrid = document.getElementById('majors-grid');
            if (majorsGrid) {
                majorsGrid.innerHTML = ''; 
                
                
                if (Array.isArray(majors)) {
                    majors.forEach(major => {
                        const majorElement = document.createElement('div');
                        majorElement.classList.add('feature');
                        
                        majorElement.innerHTML = `
                            <h3>${major.name}</h3>
                            <p>${major.college}</p>
                            <a href="${major.url}" target="_blank" class="major-link">Learn more</a>
                        `;
                        
                        majorsGrid.appendChild(majorElement);
                    });
                } else {
                    console.error("Expected array but got something else:", majors);
                }
            }
        })
        .catch(error => console.error('Error loading majors:', error));
}