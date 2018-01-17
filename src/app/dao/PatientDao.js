const Patient = require('../model/PatientModel');

async function getPatients() {

    // const sql =
    //     `SELECT
    //     id,
    //     group_id AS groupId,
    //     patient_name AS patientName,
    //     age,
    //     gestational_days AS gestationalDays,
    //     height,
    //     weight,
    //     initial_vas_score AS initialVasScore,
    //     cervical_dilation_at_time_of_ea AS cervicalDilationAtTimeOfEa,
    //     heart_rate AS heartRate,
    //     systolic_blood_pressure AS systolicBloodPressure,
    //     diastolic_blood_pressure AS diastolicBloodPressure,
    //     foetal_heart_rate AS foetalHeartRate,
    //     description
    //     FROM patient`;
    //
    // return await mysql.execQuery(sql);

    return await Patient.findAll();

}

module.exports = {
    getPatients
};