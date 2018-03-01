import Sequelize from 'sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';
import SensoryBlock from './SensoryBlockModel';

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
            type: Sequelize.INTEGER
        },
        hasContraction: {
            field: 'has_contraction',
            type: Sequelize.BOOLEAN
        },
        vasScore: {
            field: 'vas_score',
            type: Sequelize.INTEGER
        },
        thoracicSensoryBlockLeftValue: {
            field: 'thoracic_sensory_block_left_value',
            type: Sequelize.INTEGER
        },
        thoracicSensoryBlockRightValue: {
            field: 'thoracic_sensory_block_right_value',
            type: Sequelize.INTEGER
        },
        sacralSensoryBlockLeftValue: {
            field: 'sacral_sensory_block_left_value',
            type: Sequelize.INTEGER
        },
        sacralSensoryBlockRightValue: {
            field: 'sacral_sensory_block_right_value',
            type: Sequelize.INTEGER
        },
        bromageScore: {
            field: 'bromage_score',
            type: Sequelize.INTEGER
        },
        systolicBloodPressure: {
            field: 'systolic_blood_pressure',
            type: Sequelize.INTEGER
        },
        diastolicBloodPressure: {
            field: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER
        },
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER
        },
        pulseOxygenSaturation: {
            field: 'pulse_oxygen_saturation',
            type: Sequelize.FLOAT
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
    foreignKey: 'thoracicSensoryBlockLeftValue'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'thoracicSensoryBlockRight',
    foreignKey: 'thoracicSensoryBlockRightValue'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'sacralSensoryBlockLeft',
    foreignKey: 'sacralSensoryBlockLeftValue'
});

Analgesia.belongsTo(SensoryBlock, {
    as: 'sacralSensoryBlockRight',
    foreignKey: 'sacralSensoryBlockRightValue'
});

export default Analgesia;