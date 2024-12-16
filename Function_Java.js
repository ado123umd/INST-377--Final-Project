async function LoadAPICourses() {

    return fetch(`https://api.umd.io/v1/courses?per_page=200`)
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






window.onload =  async function () {
    await LoadSemester();
    await LoadStartTime();
    await LoadCourse();
    await LoadDepartment();
    
};
