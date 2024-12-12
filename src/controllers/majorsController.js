const axios = require('axios');

const getMajors = async (req, res) => {
    const majorId = req.params.majorId;

    // Validate the majorId parameter
    if (!majorId) {
        try {
            const response = await axios.get('https://api.umd.io/v1/majors/list');
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching majors');
        }
    } else {
        try {
            const response = await axios.get(`https://api.umd.io/v1/majors/list/${majorId}`);
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching major details');
        }
    }
};



module.exports = { getMajors };
