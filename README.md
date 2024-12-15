# INST-377--Final-Project
# Project Title 
Chelone


## Course Scheduler Web App
 The course scheduler is a web-based application to provide users with detailed information about the university courses, prerequisite for the courses and enable students to manage their courses by scheduling their courses.
Our project allows UMD students to easily create a schedule for registering for classes. Our project allows students to search for specific types of classes such as benchmark or core classes and allows them to see those speific classes that fit with their majors. This will allow students to more easioly find what classes they may need to sign up for when registering for classes.


 ## Target Browsers
 Our target browesers for this project are:
  - Desktop browsers: Google Chrome, Firefox, Opera, Brave, Safari, Microsoft Edge
  - Mobile browsers: Safari(iOS), Google Chrome(Android) 


  ## Developer Manual
   ### Audience
   The manual is intended for future developers who will maintain the application. Below is listed all things a future developer may need to know when trying to imprtrove the site in the future and what may be needed for a developer to install our progrsm.

   ### Installation Guide
   #### Prerequisites
   - Node.js(v16.x or higher)
   - Npm (v7.x or higher)
   - Modern web browser
   - Git



   #### Installation Steps
   1. Clone the repository
   `` git clone https://github.com/ado123umd.git ``

   2. Navigate to the project
   `` cd course-scheduler``



 ## Running the application
The application has both the frontend and backend in the same directory. runnning the application requires the developer to open different terminals for the backend and frontend

### Running the backend
1. Navigate to the project backend directory
    ``cd backend-scheduler``
2. Install the backend dependencies
    `` npm install``
 3. Strart the server
    `` node server.js`` 


    ### Production Build
     to build the application for production
    `` npm run build ``

    ### Running tests
     To run the test
    `` npm test ``


    ## API Documentation

    ### Endpoints
-  GET/courses
    - Fetches the list of available courses 
    - sample Response
    ``` json
      {
          "course_id": "AASP100",
        "semester": "202501",
        "name": "Introduction to African American Studies",
        "dept_id": "AASP",
        "department": "African American Studies",
        "credits": "3",
        "description": "Significant aspects of the history .",
        "grading_method": [
            "Regular",
            "Pass-Fail",
            "Audit"
        ],
        "gen_ed": [
            [
                "DSHS",
                "DVUP"
            ]
        ],
         "core": [],
        "relationships": {
            "coreqs": null,
            "prereqs": null,
            "formerly": null,
            "restrictions": null,
            "additional_info": null,
            "also_offered_as": null,
            "credit_granted_for": null
        },
        "sections": [
            "AASP100-0101",
            "AASP100-0301",
            "AASP100-0501",
            "AASP100-0701",
            "AASP100-0201",
            "AASP100-0401",
            "AASP100-0601"
        ]
    } ``
    
-  GET /majors
    - Fetches the majors details
    - Returns
    ``` json
     {
        "major_id": 238,
        "name": "Accounting",
        "college": "Robert H. Smith School of Business",
        "url": "https://www.rhsmith.umd.edu/programs/undergraduate/academics/academic-majors"
    },``

- POST /schedules
     - adds a new schedule to the database
     - Request body
    ``` json
        {
            "user_id":123,
            "course_id": 12023,
            "semester":"summer 2024"
        }, ``
 
 Update your documentation to reflect the new endpoint:

Endpoint: GET /api/courses/popular
Description: Fetches the top 10 most popular courses (based on a popularity field in the database).
Sample Response:
json

[
    {
        "course_id": "CMSC131",
        "name": "Object-Oriented Programming I",
        "description": "Introduction to Java and object-oriented programming.",
        "credits": 4,
        "popularity": 95
    },
    {
        "course_id": "MATH140",
        "name": "Calculus I",
        "description": "Introduction to differential and integral calculus.",
        "credits": 4,
        "popularity": 90
    }
]

##Known Bugs
There are some bugs with the code itself stored in the function such as when you select other semesters in function page, it won't show up any results as all the course's semester's are in the Spring of 2025 only. The purpose of the semester form is to allow users to check previous courses in the past semesters for past avaliablity. The start time of the function page is also not sorted from "am" time to "pm" time. The order is unorganized so that can be fix if worked on. The department select form only includes courses that start with the letter "A" due to the limitation of how many courses are in the API "https://beta.umd.io". This bug can be fix if the API includes more courses to use in the function page.
