const mysql = require('../utils/mysql.js');

async function getPatients() {

    const sql =
        `SELECT
        id,
        group_id as groupId,
        patient_name as patientName,
        age,
        gestational_days as gestationalDays,
        height,
        weight,
        initial_vas_score as initialVasScore,
        cervical_dilation_at_time_of_ea as cervicalDilationAtTimeOfEa,
        heart_rate as heartRate,
        systolic_blood_pressure as systolicBloodPressure,
        diastolic_blood_pressure as diastolicBloodPressure,
        foetal_heart_rate as foetalHeartRate,
        description 
        FROM patient`;

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getPatients
};