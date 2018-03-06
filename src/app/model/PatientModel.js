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
            type: Sequelize.INTEGER(1),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('groupId'));
            }
        },
        patientName: {
            field: 'patient_name',
            type: Sequelize.STRING(30)
        },
        age: {
            field: 'age',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('age'));
            }
        },
        gestationalDays: {
            field: 'gestational_days',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('gestationalDays'));
            }
        },
        height: {
            field: 'height',
            type: Sequelize.FLOAT,
            get() {
                return DataFormat.formatNumberField(this.getDataValue('height'));
            }
        },
        weight: {
            field: 'weight',
            type: Sequelize.FLOAT,
            get() {
                return DataFormat.formatNumberField(this.getDataValue('weight'));
            }
        },
        initialVasScore: {
            field: 'initial_vas_score',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('initialVasScore'));
            }
        },
        cervicalDilationAtTimeOfEA: {
            field: 'cervical_dilation_at_time_of_ea',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('cervicalDilationAtTimeOfEA'));
            }
        },
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('heartRate'));
            }
        },
        systolicBloodPressure: {
            field: 'systolic_blood_pressure',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('systolicBloodPressure'));
            }
        },
        diastolicBloodPressure: {
            field: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER(3),
            get() {
                return DataFormat.formatNumberField(this.getDataValue('diastolicBloodPressure'));
            }
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