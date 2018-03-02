import Sequelize from 'sequelize';
import SequelizeGenerator from '../utils/SequelizeGenerator.js';

const sequelizeInstance = SequelizeGenerator(),

    Group = sequelizeInstance.define('dpe_group', {
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
        timestamps: false
    });

export default Group;