// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Load courses when page starts
    loadCourses();
    
    // Set up search box
    const searchBox = document.querySelector('.search-container input');
    searchBox.addEventListener('input', function() {
        searchCourses(this.value);
    });
});

// Get courses from UMD API
function loadCourses() {
    fetch('https://api.umd.io/v1/courses?per_page=6')
        .then(response => response.json())
        .then(courses => {
            showCourses(courses);
            showStats(courses);
        });
}

// Search for courses
function searchCourses(searchText) {
    if (!searchText) {
        loadCourses();
        return;
    }
    
    fetch(`https://api.umd.io/v1/courses?search=${searchText}`)
        .then(response => response.json())
        .then(courses => showCourses(courses));
}

// Display courses on page
function showCourses(courses) {
    const container = document.querySelector('.feature-grid');
    container.innerHTML = '';
    
    courses.forEach(course => {
        container.innerHTML += `
            <div class="feature">
                <h3>${course.course_id}: ${course.name}</h3>
                <p>${course.description || 'No description available'}</p>
                <span>Credits: ${course.credits}</span>
            </div>
        `;
    });
}

// Show course statistics
function showStats(courses) {
    const chart = new Chart('courseStats', {
        type: 'bar',
        data: {
            labels: courses.map(c => c.course_id),
            datasets: [{
                label: 'Course Credits',
                data: courses.map(c => Number(c.credits)),
                backgroundColor: 'rgba(224, 58, 62, 0.5)'
            }]
        }
    });
}
