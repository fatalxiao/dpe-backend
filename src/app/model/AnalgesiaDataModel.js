const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    AnalgesiaData = sequelizeInstance.define('analgesia_data', {
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
            type: Sequelize.INTEGER(3)
        },
        thoracicSensoryBlockLeft: {
            field: 'thoracic_sensory_block_left',
            type: Sequelize.INTEGER
        },
        thoracicSensoryBlockRight: {
            field: 'thoracic_sensory_block_right',
            type: Sequelize.INTEGER
        },
        sacralSensoryBlockLeft: {
            field: 'sacral_sensory_block_left',
            type: Sequelize.INTEGER
        },
        sacralSensoryBlockRight: {
            field: 'sacral_sensory_block_right',
            type: Sequelize.INTEGER
        },
        bromageScore: {
            field: 'bromage_score',
            type: Sequelize.INTEGER
        },
        systolicBloodPressure: {
            field: 'systolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        diastolicBloodPressure: {
            field: 'diastolic_blood_pressure',
            type: Sequelize.INTEGER(3)
        },
        heartRate: {
            field: 'heart_rate',
            type: Sequelize.INTEGER(3)
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

module.exports = AnalgesiaData;