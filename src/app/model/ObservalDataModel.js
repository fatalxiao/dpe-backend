const Sequelize = require('Sequelize'),
    sequelizeInstance = require('../utils/SequelizeGenerator')(),

    ObservalData = sequelizeInstance.define('observal_data', {
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
        hasCarbetocin: {
            field: 'has_carbetocin',
            type: Sequelize.BOOLEAN
        },
        hasHemabate: {
            field: 'has_hemabate',
            type: Sequelize.BOOLEAN
        },
        localAnestheticConsumption: {
            field: 'local_anesthetic_consumption',
            type: Sequelize.INTEGER
        },
        pcaCount: {
            field: 'pca_count',
            type: Sequelize.INTEGER
        },
        manualBolusCount: {
            field: 'manual_bolus_count',
            type: Sequelize.INTEGER
        },
        firstPcaTime: {
            field: 'first_pca_time',
            type: Sequelize.DATE
        },
        firstManualBolusTime: {
            field: 'first_manual_bolus_time',
            type: Sequelize.DATE
        },
        durationOfSecondStageOfLabor: {
            field: 'duration_of_second_stage_of_labor',
            type: Sequelize.INTEGER
        },
        hasEpiduralCatheterAdjuestment: {
            field: 'has_epidural_catheter_adjuestment',
            type: Sequelize.BOOLEAN
        },
        hasEpiduralCatheterReplacement: {
            field: 'has_epidural_catheter_replacement',
            type: Sequelize.BOOLEAN
        },
        hasPrenatalFever: {
            field: 'has_prenatal_fever',
            type: Sequelize.BOOLEAN
        },
        hasVasoactiveAgent: {
            field: 'has_vasoactive_agent',
            type: Sequelize.BOOLEAN
        },
        isUnabled_ToPunctureDura: {
            field: 'is_unabled_to_puncture_dura',
            type: Sequelize.BOOLEAN
        },
        hasNausea: {
            field: 'has_nausea',
            type: Sequelize.BOOLEAN
        },
        hasVomit: {
            field: 'has_vomit',
            type: Sequelize.BOOLEAN
        },
        hasPruritus: {
            field: 'has_pruritus',
            type: Sequelize.BOOLEAN
        },
        hasHypotension: {
            field: 'has_hypotension',
            type: Sequelize.BOOLEAN
        },
        hasCaesareanSection: {
            field: 'has_caesarean_section',
            type: Sequelize.BOOLEAN
        },
        hasInstrumental: {
            field: 'has_instrumental',
            type: Sequelize.BOOLEAN
        },
        hasPostduralPunctureHeadache: {
            field: 'has_postdural_puncture_headache',
            type: Sequelize.BOOLEAN
        },
        hasBackPain: {
            field: 'has_back_pain',
            type: Sequelize.BOOLEAN
        },
        hasParesthesia: {
            field: 'has_paresthesia',
            type: Sequelize.BOOLEAN
        },
        durationOfLaborAnalgesia: {
            field: 'duration_of_labor_analgesia',
            type: Sequelize.INTEGER
        },
        patientSatisfactionScore: {
            field: 'patient_satisfaction_score',
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'ctime',
        updatedAt: 'utime',
        deletedAt: 'dtime',
        paranoid: true
    });

module.exports = ObservalData;