const supabase = require('../db/supabase')

// create a schedule
const createSchedule = async (req, res) => {
    const { user_id, course_id, semester } = req.body;

    try {
        const { data, error } = await supabase
            .from('schedules')
            .insert([{ user_id, course_id, semester }]);

        if (error) {
            throw error;
        }

        res.status(201).json({ message: 'Schedule created successfully', data });
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'Failed to create schedule' });
    }
};

// Get schedule by user ID
const getUserSchedule = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('schedules')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch schedule' });
    }
};

// Add course to schedule
const addCourse = async (req, res) => {
    const { userId, courseId, semester } = req.body;

    try {
        const { data, error } = await supabase
            .from('schedules')
            .insert([{ user_id: userId, course_id: courseId, semester }]);

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add course to schedule' });
    }
};

module.exports = { createSchedule, getUserSchedule, addCourse };
