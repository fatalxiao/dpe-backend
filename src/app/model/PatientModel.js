import Sequelize from 'sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

import Group from './GroupModel';

const sequelizeInstance = SequelizeGenerator(),

    Patient = sequelizeInstance.define('patients', {
        id: {
            field: 'id',
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        groupId: {
            field: 'group_id',
            type: Sequelize.INTEGER(1)
        },
        patientName: {
            field: 'patient_name',
            type: Sequelize.STRING(30)
        },
        age: {
            field: 'age',
            type: Sequelize.INTEGER(3)
        },
        gestationalDays: {
            field: 'gestational_days',
            type: Sequelize.INTEGER(3)
        },
        height: {
            field: 'height',
            type: Sequelize.FLOAT
        },
        weight: {
            field: 'weight',
            type: Sequelize.FLOAT
        },
        initialVasScore: {
            field: 'initial_vas_score',
            type: Sequelize.INTEGER(3)
        },
        cervicalDilationAtTimeOfEA: {
            field: 'cervical_dilation_at_time_of_ea',
            type: Sequelize.INTEGER(3)
        },
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER(3)
        },
        systolicBloodPressure: {
            field: 'systolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        diastolicBloodPressure: {
            field: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        disabled: {
            field: 'disabled',
            type: Sequelize.BOOLEAN
        },
        description: {
            field: 'description',
            type: Sequelize.STRING(1000)
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'ctime',
        updatedAt: 'utime',
        deletedAt: 'dtime',
        paranoid: true
    });

Patient.belongsTo(Group, {
    as: 'group',
    foreignKey: 'groupId'
});

export default Patient;