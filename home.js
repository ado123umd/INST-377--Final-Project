document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

// UMD API
function loadCourses() {
    fetch('https://api.umd.io/v1/courses?per_page=6')
        .then(response => response.json())
        .then(courses => {
            showCourses(courses);
        });
}

// Display courses on page
function showCourses(courses) {
    const container = document.querySelector('.feature-grid');
    container.innerHTML = '';
    
    courses.forEach(course => {
        container.innerHTML += `
            <div class="feature">
                <h3>${course.course_id}: ${course.name}</h3>
                <p>${course.description}</p>
                <span>Credits: ${course.credits}</span>
            </div>
        `;
    });
}
