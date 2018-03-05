import Sequelize from 'sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

const sequelizeInstance = SequelizeGenerator(),

    SensoryBlock = sequelizeInstance.define('sensory_block', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: Sequelize.STRING(20)
        },
        value: {
            field: 'value',
            type: Sequelize.INTEGER
        },
        type: {
            field: 'type',
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

export default SensoryBlock;