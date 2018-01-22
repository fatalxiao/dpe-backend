import Sequelize from 'Sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

const sequelizeInstance = SequelizeGenerator();

export default sequelizeInstance.define('sensory_block', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    sensoryBlockName: {
        field: 'sensory_block_name',
        type: Sequelize.STRING(20)
    },
    sensoryBlockValue: {
        field: 'sensory_block_value',
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});