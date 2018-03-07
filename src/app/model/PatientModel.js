import Sequelize from 'sequelize';

import Group from './GroupModel';

import SequelizeGenerator from '../utils/SequelizeGenerator.js';
import DataFormat from '../utils/DataFormat.js';

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
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('groupId', DataFormat.formatNumberField(value));
            }
        },
        patientName: {
            field: 'patient_name',
            type: Sequelize.STRING(30)
        },
        age: {
            field: 'age',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('age', DataFormat.formatNumberField(value));
            }
        },
        gestationalDays: {
            field: 'gestational_days',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('gestationalDays', DataFormat.formatNumberField(value));
            }
        },
        height: {
            field: 'height',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('height', DataFormat.formatNumberField(value));
            }
        },
        weight: {
            field: 'weight',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('weight', DataFormat.formatNumberField(value));
            }
        },
        initialVasScore: {
            field: 'initial_vas_score',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('initialVasScore', DataFormat.formatNumberField(value));
            }
        },
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('heartRate', DataFormat.formatNumberField(value));
            }
        },
        systolicBloodPressure: {
            field: 'systolic_blood_pressure',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('systolicBloodPressure', DataFormat.formatNumberField(value));
            }
        },
        diastolicBloodPressure: {
            field: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('diastolicBloodPressure', DataFormat.formatNumberField(value));
            }
        },
        cervicalDilationAtTimeOfEA: {
            field: 'cervical_dilation_at_time_of_ea',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('cervicalDilationAtTimeOfEA', DataFormat.formatNumberField(value));
            }
        },
        hasOxytocinAtTimeOfEA: {
            field: 'has_oxytocin_at_time_of_ea',
            type: Sequelize.BOOLEAN
        },
        status: {
            field: 'status',
            type: Sequelize.INTEGER
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