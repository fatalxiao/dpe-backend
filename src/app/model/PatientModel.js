const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    Patient = sequelizeInstance.define('patient', {
        id: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        groupId: {
            type: Sequelize.INTEGER(1),
            filed: 'group_id'
        },
        patientName: {
            type: Sequelize.STRING(30),
            filed: 'patient_name'
        },
        age: {
            type: Sequelize.INTEGER(3)
        },
        gestationalDays: {
            type: Sequelize.INTEGER(3),
            filed: 'gestational_days'
        },
        height: {
            type: Sequelize.FLOAT
        },
        weight: {
            type: Sequelize.FLOAT
        },
        initialVasScore: {
            type: Sequelize.INTEGER(3),
            filed: 'initial_vas_score'
        },
        cervicalDilationAtTimeOfEa: {
            type: Sequelize.INTEGER(3),
            filed: 'cervical_dilation_at_time_of_ea'
        },
        heartRate: {
            type: Sequelize.INTEGER(3),
            filed: 'heart_rate'
        },
        systolicBloodPressure: {
            type: Sequelize.INTEGER(3),
            filed: 'systolic_blood_pressure'
        },
        diastolicBloodPressure: {
            type: Sequelize.INTEGER(3),
            filed: 'diastolic_blood_pressure'
        },
        foetalHeartRate: {
            type: Sequelize.INTEGER(3),
            filed: 'foetal_heart_rate'
        },
        description: {
            type: Sequelize.STRING(1000)
        }
    }, {
        timestamps: true,
        createdAt: 'ctime',
        updatedAt: 'utime',
        deletedAt: 'dtime',
        paranoid: true
    });

module.exports = Patient;