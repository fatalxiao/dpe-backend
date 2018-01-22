import Sequelize from 'Sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

const sequelizeInstance = SequelizeGenerator();

export default sequelizeInstance.define('dpe_group', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    groupName: {
        field: 'group_name',
        type: Sequelize.STRING(20)
    }
}, {
    freezeTableName: true,
    timestamps: false
});