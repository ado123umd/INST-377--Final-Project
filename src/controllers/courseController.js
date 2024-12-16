const axios = require('axios');
const supabase = require('../db/supabase') //import the db 

// Fetch courses from the UMD API
const getCourses = async (req, res) => {
    try {
        const response = await axios.get('https://api.umd.io/v1/courses/list'); 
        res.json(response.data);
       
        // save  the fetched courses into the Supabase database
    //     const {data, error } = await supabase
    //     .from('courses')
    //     .upsert(courses.map(course => ({
    //         course_id: course.id,  
    //         name: course.name,
    //     })));
    //     console.log('response',{data,error});
        

    // if (error) {
    //     console.error('Error inserting courses:', error);
    //     return res.status(500).send('Error saving courses to database');
    // }

    } catch (error) {
        console.error('Error fetching courses',error);
        res.status(500).json({error:'Error fetching courses'});
    }
};
// let's fetch the course details 
const getCourseDetails = async (req, res) => {
    const courseId = req.params.id;
    try {
        const response = await axios.get(`https://api.umd.io/v1/courses${courseId}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error fetching course details');
    }
};

// fetch the course by major

// const getCoursesByMajor = async (req, res) => {
//     const majorId = req.params.majorId;

//     // validate the majorId parametor
//     if (!majorId){
//         return res.status(400).send('Major ID is required');
//     }

//     try {
//         const response = await axios.get(`https://api.umd.io/v1/majors/list/${majorId}`);
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching courses by major');
//     }
// };

// // let's sync the courses from UMD API to supabase database
// const syncCourses = async (req, res) => {
//     try {
//         const response = await axios.get('https://api.umd.io/v1/courses/list'); 
//         const courses = response.data;
    
//         const { error } = await supabase
//             .from('courses')
//             .upsert(courses.map(course => ({
//                 course_id: course.id,
//                 name: course.name,
//             })));

//         if (error) {
//             console.error('Error syncing courses:', error.message);
//             return res.status(500).send('Error syncing courses');
//         }

//         res.status(200).send('Courses synced successfully');
    
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error syncing courses');
//     }

// };

module.exports = { getCourses, getCourseDetails};
