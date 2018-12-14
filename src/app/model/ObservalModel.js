import Sequelize from 'sequelize';

import SequelizeGenerator from '../utils/SequelizeGenerator.js';
import DataFormat from '../utils/DataFormat';

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
            type: Sequelize.DATE,
            get() {
                return DataFormat.formatResDateTime(this.getDataValue('initialTime'));
            },
            set(value) {
                this.setDataValue('initialTime', DataFormat.formatDateTimeField(value));
            }
        },
        testDose: {
            field: 'test_dose',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('testDose', DataFormat.formatNumberField(value));
            }
        },
        initialDose: {
            field: 'initial_dose',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('initialDose', DataFormat.formatNumberField(value));
            }
        },
        pumpConsumption: {
            field: 'pump_consumption',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('pumpConsumption', DataFormat.formatNumberField(value));
            }
        },
        bolus: {
            field: 'bolus',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('bolus', DataFormat.formatNumberField(value));
            }
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
            type: Sequelize.DATE,
            get() {
                return DataFormat.formatResDateTime(this.getDataValue('firstPcaTime'));
            },
            set(value) {
                this.setDataValue('firstPcaTime', DataFormat.formatDateTimeField(value));
            }
        },
        pcaCount: {
            field: 'pca_count',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('pcaCount', DataFormat.formatNumberField(value));
            }
        },
        firstManualBolusTime: {
            field: 'first_manual_bolus_time',
            type: Sequelize.DATE,
            get() {
                return DataFormat.formatResDateTime(this.getDataValue('firstManualBolusTime'));
            },
            set(value) {
                this.setDataValue('firstManualBolusTime', DataFormat.formatDateTimeField(value));
            }
        },
        manualBolusCount: {
            field: 'manual_bolus_count',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('manualBolusCount', DataFormat.formatNumberField(value));
            }
        },
        durationOfFirstStageOfLabor: {
            field: 'duration_of_first_stage_of_labor',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('durationOfFirstStageOfLabor', DataFormat.formatNumberField(value));
            }
        },
        durationOfSecondStageOfLabor: {
            field: 'duration_of_second_stage_of_labor',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('durationOfSecondStageOfLabor', DataFormat.formatNumberField(value));
            }
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
        prenatalFeverTemperature: {
            field: 'prenatal_fever_temperature',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('prenatalFeverTemperature', DataFormat.formatNumberField(value));
            }
        },
        hasVasoactiveAgent: {
            field: 'has_vasoactive_agent',
            type: Sequelize.BOOLEAN
        },
        isUnabledToPunctureDura: {
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
        isIVEpiduralCatheterInsertion: {
            field: 'is_iv_epidural_catheter_insertion',
            type: Sequelize.BOOLEAN
        },
        isIntrathecalEpiduralCatheterInsertion: {
            field: 'is_intrathecal_epidural_catheter_insertion',
            type: Sequelize.BOOLEAN
        },
        bloodLose: {
            field: 'blood_lose',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('bloodLose', DataFormat.formatNumberField(value));
            }
        },
        patientSatisfactionScore: {
            field: 'patient_satisfaction_score',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('patientSatisfactionScore', DataFormat.formatNumberField(value));
            }
        },
        hasAccidentalDuralPunture: {
            field: 'has_accidental_dural_punture',
            type: Sequelize.BOOLEAN
        },
        hasLateralEpisiotomy: {
            field: 'has_lateral_episiotomy',
            type: Sequelize.BOOLEAN
        },
        lateralEpisiotomyVasScore: {
            field: 'lateral_episiotomy_vas_score',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('lateralEpisiotomyVasScore', DataFormat.formatNumberField(value));
            }
        },
        foetalGender: {
            field: 'foetal_gender',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('foetalGender', DataFormat.formatNumberField(value));
            }
        },
        birthTime: {
            field: 'birth_time',
            type: Sequelize.DATE,
            get() {
                return DataFormat.formatResDateTime(this.getDataValue('birthTime'));
            },
            set(value) {
                this.setDataValue('birthTime', DataFormat.formatDateTimeField(value));
            }
        },
        foetalHeight: {
            field: 'foetal_height',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('foetalHeight', DataFormat.formatNumberField(value));
            }
        },
        foetalWeight: {
            field: 'foetal_weight',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('foetalWeight', DataFormat.formatNumberField(value));
            }
        },
        oneMinuteApgarScore: {
            field: 'one_minute_apgar_score',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('oneMinuteApgarScore', DataFormat.formatNumberField(value));
            }
        },
        fiveMinuteApgarScore: {
            field: 'five_minute_apgar_score',
            type: Sequelize.INTEGER,
            set(value) {
                this.setDataValue('fiveMinuteApgarScore', DataFormat.formatNumberField(value));
            }
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
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('arterialPh', DataFormat.formatNumberField(value));
            }
        },
        arterialBe: {
            field: 'arterial_be',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('arterialBe', DataFormat.formatNumberField(value));
            }
        },
        venousPh: {
            field: 'venous_ph',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('venousPh', DataFormat.formatNumberField(value));
            }
        },
        venousBe: {
            field: 'venous_be',
            type: Sequelize.FLOAT,
            set(value) {
                this.setDataValue('venousBe', DataFormat.formatNumberField(value));
            }
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
