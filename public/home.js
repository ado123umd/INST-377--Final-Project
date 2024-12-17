document.addEventListener('DOMContentLoaded', function() {
    loadAllCourses();
});

function loadAllCourses() {
    fetch('https://api.umd.io/v1/courses?per_page=100')
        .then(response => response.json())
        .then(courses => {
            showCourses(courses);
        });
}

function showCourses(courses) {
    const container = document.querySelector('.feature-grid');
    
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