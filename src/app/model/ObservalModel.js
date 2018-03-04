import Sequelize from 'sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

const sequelizeInstance = SequelizeGenerator(),

    Observal = sequelizeInstance.define('observal_data', {
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
        initialTime: {
            field: 'initial_time',
            type: Sequelize.DATE
        },
        testDose: {
            field: 'test_dose',
            type: Sequelize.INTEGER
        },
        initialDose: {
            field: 'initial_dose',
            type: Sequelize.INTEGER
        },
        pumpConsumption: {
            field: 'pump_consumption',
            type: Sequelize.INTEGER
        },
        bolus: {
            field: 'bolus',
            type: Sequelize.INTEGER
        },
        hasCarbetocin: {
            field: 'has_carbetocin',
            type: Sequelize.BOOLEAN
        },
        hasHemabate: {
            field: 'has_hemabate',
            type: Sequelize.BOOLEAN
        },
        firstPcaTime: {
            field: 'first_pca_time',
            type: Sequelize.DATE
        },
        pcaCount: {
            field: 'pca_count',
            type: Sequelize.INTEGER
        },
        firstManualBolusTime: {
            field: 'first_manual_bolus_time',
            type: Sequelize.DATE
        },
        manualBolusCount: {
            field: 'manual_bolus_count',
            type: Sequelize.INTEGER
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
        },
        hasAccidentalDuralPunture: {
            field: 'has_accidental_dural_punture',
            type: Sequelize.BOOLEAN
        },
        lateralEpisiotomyVasScore: {
            field: 'lateral_episiotomy_vas_score',
            type: Sequelize.INTEGER
        },
        hasLateralEpisiotomy: {
            field: 'has_lateral_episiotomy',
            type: Sequelize.BOOLEAN
        },
        birthTime: {
            field: 'birth_time',
            type: Sequelize.DATE
        },
        foetalHeight: {
            field: 'foetal_height',
            type: Sequelize.INTEGER
        },
        foetalWeight: {
            field: 'foetal_weight',
            type: Sequelize.INTEGER
        },
        oneMinuteApgarScore: {
            field: 'one_minute_apgar_score',
            type: Sequelize.INTEGER
        },
        fiveMinuteApgarScore: {
            field: 'five_minute_apgar_score',
            type: Sequelize.INTEGER
        },
        hasNicu: {
            field: 'has_nicu',
            type: Sequelize.BOOLEAN
        },
        nicuReason: {
            field: 'nicu_reason',
            type: Sequelize.STRING
        },
        arterialPh: {
            field: 'arterial_ph',
            type: Sequelize.FLOAT
        },
        arterialBe: {
            field: 'arterial_be',
            type: Sequelize.FLOAT
        },
        venousPh: {
            field: 'venous_ph',
            type: Sequelize.FLOAT
        },
        venousBe: {
            field: 'venous_be',
            type: Sequelize.FLOAT
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

export default Observal;