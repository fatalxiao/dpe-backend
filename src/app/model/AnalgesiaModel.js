import Sequelize from 'sequelize';

import SensoryBlock from './SensoryBlockModel';

import SequelizeGenerator from '../utils/SequelizeGenerator.js';
import DataFormat from '../utils/DataFormat.js';

const sequelizeInstance = SequelizeGenerator(),

    Analgesia = sequelizeInstance.define('analgesia_data', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        patientId: {
            field: 'patient_id',
            type: Sequelize.STRING(10)
        },
        timePoint: {
            field: 'time_point',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('timePoint', DataFormat.formatNumberField(value));
            }
        },
        hasContraction: {
            field: 'has_contraction',
            type: Sequelize.BOOLEAN
        },
        vasScore: {
            field: 'vas_score',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('vasScore', DataFormat.formatNumberField(value));
            }
        },
        thoracicSensoryBlockLeftValue: {
            field: 'thoracic_sensory_block_left_value',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('thoracicSensoryBlockLeftValue', DataFormat.formatNumberField(value));
            }
        },
        thoracicSensoryBlockRightValue: {
            field: 'thoracic_sensory_block_right_value',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('thoracicSensoryBlockRightValue', DataFormat.formatNumberField(value));
            }
        },
        sacralSensoryBlockLeftValue: {
            field: 'sacral_sensory_block_left_value',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('sacralSensoryBlockLeftValue', DataFormat.formatNumberField(value));
            }
        },
        sacralSensoryBlockRightValue: {
            field: 'sacral_sensory_block_right_value',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('sacralSensoryBlockRightValue', DataFormat.formatNumberField(value));
            }
        },
        bromageScore: {
            field: 'bromage_score',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('bromageScore', DataFormat.formatNumberField(value));
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
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('heartRate', DataFormat.formatNumberField(value));
            }
        },
        pulseOxygenSaturation: {
            field: 'pulse_oxygen_saturation',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('pulseOxygenSaturation', DataFormat.formatNumberField(value));
            }
        },
        fetalHeartRate: {
            field: 'fetal_heart_rate',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('fetalHeartRate', DataFormat.formatNumberField(value));
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'ctime',
        updatedAt: 'utime',
        deletedAt: 'dtime',
        paranoid: true
    });

Analgesia.belongsTo(SensoryBlock, {
    as: 'thoracicSensoryBlockLeft',
    foreignKey: 'thoracicSensoryBlockLeftValue',
    targetKey: 'value'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'thoracicSensoryBlockRight',
    foreignKey: 'thoracicSensoryBlockRightValue',
    targetKey: 'value'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'sacralSensoryBlockLeft',
    foreignKey: 'sacralSensoryBlockLeftValue',
    targetKey: 'value'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'sacralSensoryBlockRight',
    foreignKey: 'sacralSensoryBlockRightValue',
    targetKey: 'value'
});

export default Analgesia;
