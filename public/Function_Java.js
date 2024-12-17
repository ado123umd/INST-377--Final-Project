async function LoadAPICourses() {

    return fetch(`GET/courses`)
        .then ((res) => res.json());
}

async function LoadAPISemester() {

    return fetch('https://api.umd.io/v1/courses/semesters?per_page=200')
        .then ((res) => res.json());


}

async function LoadAPIDepartment() {

    const GET = await fetch('https://api.umd.io/v1/courses/departments');
    const Department = await GET.json();
    return Department.slice(0,19);


}

async function LoadAPISection() {

    return fetch('https://api.umd.io/v1/courses/sections')
        .then ((res) => res.json());

}

async function LoadSection() {


    const section = await LoadAPISection();


    
    const apiSection = document.getElementById("sections");
    section.forEach( (sections) => {

        const option = document.createElement('option')
        option.value = sections.section_id
        option.textContent = `${sections.section_id}`
        apiSection.appendChild(option)


})}

async function LoadDepartment() {


    const department = await LoadAPIDepartment();


    
    const apiDepartment = document.getElementById("departments");
    department.forEach( (departments) => {

        const option = document.createElement('option')
        option.value = departments.dept_id
        option.textContent = `${departments.dept_id} - ${departments.department}`
        apiDepartment.appendChild(option)


})}


async function LoadStartTime() {

    const section = await LoadAPISection();

    const ST = new Set();

    section.forEach((section) => {
        if (section.meetings) {
            section.meetings.forEach((meetings) => {
                if (meetings.start_time) {
                    ST.add(meetings.start_time);
                }
            });
        }
        
    });
    
    const apiSection = document.getElementById("startTime");

    

    ST.forEach( (startTime) => {

        const option = document.createElement('option')
        option.value = startTime
        option.textContent = startTime
        apiSection.appendChild(option)
        
    })

}



function semesterFormat(YYMM) {

    const month = String(YYMM).slice(4);
    const year = String(YYMM).slice(0,4);


    if (month === "01") {
        semestermonth = "Spring";
    }
    else 
    if (month === "05") {
        semestermonth = "Summer";
    }
    else
    if (month === "08") {
        semestermonth = "Fall";
    }
    else 
    if (month === "12") {
        semestermonth = "Winter";
    }

    return `${semestermonth} ${year}`;


}



async function LoadSemester() {

    const semesters = await LoadAPISemester();


    
    const apiSemester = document.getElementById("semesters");
    semesters.forEach( (semester) => {


        
        const option = document.createElement('option')
        option.value = semesterFormat(semester)
        option.textContent = `${option.value}`
        apiSemester.appendChild(option)


})}

async function LoadCourse() {

    const courses = await LoadAPICourses();


    
    const apiCourses = document.getElementById("courses");
    courses.forEach( (courses) => {

        const option = document.createElement('option')
        option.value = courses.course_id
        option.textContent = `${courses.course_id} - ${courses.name}`
        apiCourses.appendChild(option)
        
    })

}


async function LoadAPICourses() {
    const response = await fetch(`https://api.umd.io/v1/courses?per_page=200`);
    return response.json();
}



document.getElementById("AddCourse").addEventListener("click", function (loading) {
    loading.preventDefault();

    
    const course_id = document.getElementById("courses").value;
    const courseName = document.getElementById("courses").selectedOptions[0]?.textContent;
    const section = document.getElementById("sections").value;
    const startTime = document.getElementById("startTime").value;

    if (!course_id) {
        alert("Fill out the entire form before entering.");
        return;
    } else
    if (!courseName) {
        alert("Fill out the entire form before entering.");
        return;
    } else
    if (!section) {
        alert("Fill out the entire form before entering.");
        return;
    } else
    if (!startTime) {
        alert("Fill out the entire form before entering.");
        return;
    } 

    
    const tableBody = document.querySelector("#courseTable tbody");

    
    const row = document.createElement("tr");

    
    const course_idRow = document.createElement("td");
    course_idRow.textContent = course_id;
    row.appendChild(course_idRow);

    const courseNameRow = document.createElement("td");
    courseNameRow.textContent = courseName;
    row.appendChild(courseNameRow);

    const sectionRow = document.createElement("td");
    sectionRow.textContent = section;
    row.appendChild(sectionRow);

    const startTimeRow = document.createElement("td");
    startTimeRow.textContent = startTime;
    row.appendChild(startTimeRow);

    
    tableBody.appendChild(row);
});



window.onload =  async function () {
    await LoadStartTime();
    await LoadCourse();
    await LoadSection();
    
};
