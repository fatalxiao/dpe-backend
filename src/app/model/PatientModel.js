const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    Patient = sequelizeInstance.define('patient', {
        id: {
            filed: 'id',
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        groupId: {
            filed: 'group_id',
            type: Sequelize.INTEGER(1)
        },
        patientName: {
            filed: 'patient_name',
            type: Sequelize.STRING(30)
        },
        age: {
            filed: 'age',
            type: Sequelize.INTEGER(3)
        },
        gestationalDays: {
            filed: 'gestational_days',
            type: Sequelize.INTEGER(3)
        },
        height: {
            filed: 'height',
            type: Sequelize.FLOAT
        },
        weight: {
            filed: 'weight',
            type: Sequelize.FLOAT
        },
        initialVasScore: {
            filed: 'initial_vas_score',
            type: Sequelize.INTEGER(3)
        },
        cervicalDilationAtTimeOfEa: {
            filed: 'cervical_dilation_at_time_of_ea',
            type: Sequelize.INTEGER(3)
        },
        heartRate: {
            filed: 'heart_rate',
            type: Sequelize.INTEGER(3)
        },
        systolicBloodPressure: {
            filed: 'systolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        diastolicBloodPressure: {
            filed: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        foetalHeartRate: {
            filed: 'foetal_heart_rate',
            type: Sequelize.INTEGER(3)
        },
        description: {
            filed: 'description',
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