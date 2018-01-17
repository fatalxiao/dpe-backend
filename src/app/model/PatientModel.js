const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    Patient = sequelizeInstance.define('patient', {
        id: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        group_id: Sequelize.INTEGER(1),
        patient_name: Sequelize.STRING(30),
        age: Sequelize.INTEGER(3),
        gestational_days: Sequelize.INTEGER(3),
        height: Sequelize.FLOAT,
        weight: Sequelize.FLOAT,
        initial_vas_score: Sequelize.INTEGER(3),
        cervical_dilation_at_time_of_ea: Sequelize.INTEGER(3),
        heart_rate: Sequelize.INTEGER(3),
        systolic_blood_pressure: Sequelize.INTEGER(3),
        diastolic_blood_pressure: Sequelize.INTEGER(3),
        foetal_heart_rate: Sequelize.INTEGER(3),
        description: Sequelize.STRING(1000)
    }, {
        timestamps: true,
        createdAt: 'ctime',
        updatedAt: 'utime',
        deletedAt: 'dtime',
        paranoid: true
    });

module.exports = Patient;